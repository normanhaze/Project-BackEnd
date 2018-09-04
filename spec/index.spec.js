process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed.js");
const mongoose = require("mongoose");
const userData = require("../seed/data/users");
const routeData = require("../seed/data/routes");

describe("/API", () => {
  let routeDocs, userDocs;
  beforeEach(() => {
    return seedDB(userData, routeData)
      .then(docs => {
        [userDocs, routeDocs] = docs;
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
describe("/routes", () => {
  it("GET / responds with all routes", () => {
    return request
      .get("/api/routes")
      .expect(200)
      .then(res => {
        expect(res.body.routes.length).to.equal(3);
        expect(res.body.routes[1]).to.have.all.keys(
          "user",
          "route",
          "_id",
          "__v"
        );
        expect(res.body.routes[2].route[0]).to.have.all.keys(
          "LatLng",
          "strokeWidth",
          "strokeColor",
          "newSection"
        );
      });
  });
  it("GET /:route_id", () => {
    expect().to.equal();
  });
});
