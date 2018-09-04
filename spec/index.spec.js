process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed.js");
const mongoose = require("mongoose");
const userData = require("../seed/data/users");
const journeyData = require("../seed/data/journies");

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
describe("/journies", () => {
  it("GET / responds with all journies", () => {
    return request
      .get("/api/journies")
      .expect(200)
      .then(res => {
        expect(res.body.journies.length).to.equal(3);
        expect(res.body.journies[1]).to.have.all.keys(
          "user",
          "route",
          "_id",
          "__v"
        );
        expect(res.body.journies[2].journey[0]).to.have.all.keys(
          "LatLng",
          "strokeWidth",
          "strokeColor",
          "newSection"
        );
      });
  });
  it("GET /:journey_id responds with the correct journey", () => {
    return request
      .get(`/api/journies/${journeyDocs[1]._id}`)
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
  it("GET /:username returns all journies made by a particular user", () => {
    return request
      .get(`/api/journies/`)
      .expect(200)
      .then(res => {});
    expect().to.equal();
  });
});
