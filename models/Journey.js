const mongoose = require("mongoose");
const { Schema } = mongoose;

const latLngSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const routeSchema = new Schema({
  width: Number,
  colour: String,
  latLng: {
    type: [latLngSchema],
    required: true,
    default: undefined
  }
});

const journeySchema = new Schema({
  user: {
    type: String,
    ref: "users",
    required: true
  },
  route: {
    type: [routeSchema],
    required: true
  },
  previousVersions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journeys"
    }
  ]
});

module.exports = mongoose.model("journeys", journeySchema);
