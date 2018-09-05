process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed.js");
const mongoose = require("mongoose");
const userData = require("../seed/data/users");
const journeyData = require("../seed/data/journeys");

describe("/API", () => {
  let journeyDocs, userDocs;
  beforeEach(() => {
    return seedDB(userData, journeyData)
      .then(docs => {
        [userDocs, journeyDocs] = docs;
      })
      .catch(console.log);
  });
  after(() => {
    mongoose.disconnect();
  });

  it("returns the first user", () => {
    expect(userDocs[0].username).to.equal("normanhaze");
  });
  it('GET a 404 PAGE NOT FOUND when skipping the "api" route', () => {
    return request
      .get("/users")
      .expect(404)
      .then(res => expect(res.body.message).to.equal("Page Not Found"));
  });
  it("GET a 404 PAGE NOT FOUND when inputting a page which does not exist", () => {
    return request
      .get("/api/hello")
      .expect(404)
      .then(res => expect(res.body.message).to.equal("Page Not Found"));
  });

  describe("/journeys", () => {
    it("GET / responds with all journeys", () => {
      return request
        .get("/api/journeys")
        .expect(200)
        .then(res => {
          expect(res.body.allJourneys.length).to.equal(4);
          expect(res.body.allJourneys[1]).to.have.all.keys(
            "user",
            "route",
            "_id",
            "__v",
            "previousVersions"
          );
          expect(res.body.allJourneys[3].route[0]).to.have.all.keys(
            "latLng",
            "strokeWidth",
            "strokeColor",
            "_id"
          );
        });
    });
    it("GET /:journey_id responds with the correct journey", () => {
      return request
        .get(`/api/journeys/${journeyDocs[2]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.journey).to.have.all.keys(
            "user",
            "route",
            "_id",
            "__v",
            "previousVersions"
          );
          expect(res.body.journey.user).to.equal("crylittlesister");
        });
    });
    it("GET /:journey_id responds with a 404 when inputting an incorrect journey id", () => {
      return request
        .get(`/api/journeys/${userDocs[1]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal(
            `Journey ${userDocs[1]._id} not found`
          );
        });
    });
    it("GET /:journey_id responds with a 400 when inputting an incorrect journey id format", () => {
      return request
        .get(`/api/journeys/myJourney`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            'Cast to ObjectId failed for value "myJourney" at path "_id" for model "journeys"'
          );
        });
    });

    it("POST / posts a new journey", () => {
      return request
        .post(`/api/journeys/`)
        .send({
          user: "normanhaze",
          route: [
            {
              strokeWidth: 1,
              strokeColor: "#FFA500",
              latLng: [
                {
                  latitude: 53.4868444,
                  longitude: -2.2407841
                },
                {
                  latitude: 53.4862066,
                  longitude: -2.2412136
                },
              ]  
            }
          ]
        })
        .expect(201)
        .then(res => {
          expect(res.body.journey.route[0].strokeColor).to.equal("#FFA500");
        });
    });
    it("POST /journeys responds with a 400 BAD REQUEST when not following the schema", () => {
      return request
        .post(`/api/journeys/`)
        .send({
          route: []
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            "journeys validation failed: user: Path `user` is required."
          );
        });
    });
    it("POST /journeys responds with a 400 BAD REQUEST when incorrect data type is provided", () => {
      return request
        .post(`/api/journeys/`)
        .send({
          user: "crylittlesister",
          route: [
            {
              strokeWidth: "hello"
              }
          ]
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            'journeys validation failed: route.0.strokeWidth: Cast to Number failed for value "hello" at path "strokeWidth"'
          );
        });
    });
    it("POST /journeys responds with a 400 BAD REQUEST when nested objects are not following the schema", () => {
      return request
        .post(`/api/journeys/`)
        .send({
          user: "crylittlesister",
          route: [
            {
              latLng: {
                height: 200,
                width: 100
              }
            }
          ]
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            "journeys validation failed: route.0.latLng.0.longitude: Path `longitude` is required., route.0.latLng.0.latitude: Path `latitude` is required."
          );
        });
    });
    it.only("POST /journeys responds with a 400 BAD REQUEST when required keys for nested objects are not provided", () => {
      return request
        .post(`/api/journeys/`)
        .send({
          user: "crylittlesister",
          route: [
            {
              strokeWidth: 2
            }
          ]
        })
        .expect(400)
        .then(res => {
          //console.log(res.body.journey.route)
          expect(res.body.message).to.equal(
            "journeys validation failed: route.0.latLng: Path `latLng` is required."
          );
        });
    });
    it("DELETE", () => {
      return request
        .delete(`/api/journeys/${journeyDocs[2]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.journey.user).to.equal("crylittlesister");
        });
    });
    it("returns a 404 when given an id not associated to a journey", () => {
      return request
        .delete(`/api/journeys/${userDocs[2]._id}`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal(
            `Journey ${userDocs[2]._id} not found`
          );
        });
    });
    it("returns a 400 when given an incorrect journey id format", () => {
      return request
        .delete(`/api/journeys/myJourney`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            'Cast to ObjectId failed for value "myJourney" at path "_id" for model "journeys"'
          );
        });
    });
  });

  describe("/users", () => {
    it("GET / returns all users ", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body.allUsers.length).to.equal(6);
          expect(res.body.allUsers[5].username).to.equal("sylfie");
        });
    });
    it("GET /:username returns the correct user", () => {
      return request
        .get("/api/users/louillustrator")
        .expect(200)
        .then(res => {
          expect(res.body.user).to.have.all.keys(
            "username",
            "password",
            "_id",
            "__v"
          );
          expect(res.body.user.password).to.equal("lunchbox");
        });
    });
    it("/:username returns a 404 PAGE NOT FOUND when inputting a username which does not exist", () => {
      return request
        .get("/api/helloKitty/")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
    it("GET /:username/journeys returns all journeys made by a particular user", () => {
      return request
        .get("/api/users/robd33/journeys")
        .expect(200)
        .then(res => {
          expect(res.body.journeys.length).to.equal(2);
          expect(res.body.journeys[1].route[0].latLng[0].latitude).to.equal(
            53.485703
          );
        });
    });
    it("GET /:username/journeys responds with a 404 when inputting an incorrect username", () => {
      return request
        .get("/api/helloKitty/journeys")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("Page Not Found");
        });
    });
  });
});
