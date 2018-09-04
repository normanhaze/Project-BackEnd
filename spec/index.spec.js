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
    expect(userDocs[0].username).to.equal("Normanhaze");
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
});
describe("/journeys", () => {
  it("GET / responds with all journeys", () => {
    return request
      .get("/api/journeys")
      .expect(200)
      .then(res => {
        expect(res.body.journeys.length).to.equal(3);
        expect(res.body.journeys[1]).to.have.all.keys(
          "user",
          "route",
          "_id",
          "__v"
        );
        expect(res.body.journeys[2].journey[0]).to.have.all.keys(
          "LatLng",
          "strokeWidth",
          "strokeColor",
          "newSection"
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
          "__v"
        );
        expect(res.body.journey.user).to.equal("CryLittleSister");
      });
  });
  it("GET /journey_id responds with a 404 when inputting an incorrect journey id", () => {
    return request
      .get(`/api/journeys/${userDocs[1]._id}`)
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal(
          `journey ${userDocs[1]._id} not found`
        );
      });
  });
  it("GET /:journey_id responds with a 400 when inputting an incorrect journey id format", () => {
    return request
      .get(`/api/journeys/myJourney`)
      .expect(400)
      .then(res => {
        expect(res.body.message).to.equal("invalid ID format");
      });
  });
  it("GET /:username returns all journeys made by a particular user", () => {
    return request
      .get("/api/journeys/RobD33")
      .expect(200)
      .then(res => {
        expect(res.body.journeys.length).to.equal(2);
        expect(res.body.journeys[1].route[0].latLng.latitude).to.equal(
          53.485703
        );
      });
  });
  it("GET /:username responds with a 404 when inputting an incorrect username", () => {
    return request
      .get("/api/journeys/helloKitty")
      .expect(404)
      .then(res => {
        expect(res.body.message).to.equal("user helloKitty not found");
      });
  });
});
