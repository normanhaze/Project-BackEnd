const mongoose = require("mongoose");
const users = require("./data/users");
const journeys = require("./data/journeys");
const seedDB = require("./seed");
const { DB_URL } = require("../config");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => seedDB(users, journeys))
  .then(() => console.log("Data seeding successful"))
  .catch(console.error)
  .finally(() => mongoose.disconnect());
