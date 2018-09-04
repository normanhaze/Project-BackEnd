const Journey = require("../models/Journey");
const User = require("../models/User");

const getAllJourneys = (req, res, next) => {
  Journey.find()
    .then(allJourneys => {
      res.status(200).send({ allJourneys });
    })
    .catch(next);
};

const getJourneyById = (req, res, next) => {
  const { journey_id } = req.params;
  Journey.findById(journey_id)
    .then(journey => {
      if (journey === null)
        throw { status: 404, message: `Journey ${journey_id} not found` };
      res.status(200).send({ journey });
    })
    .catch(err => {
      if (err.name === "CastError") err.status = 400;
      next(err);
    });
};

const addJourney = (req, res, next) => {
  User.find({ username: req.body.user })
    .then(user => {
      if (user === null)
        throw { status: 404, message: `User ${username} not found` };
      return Journey.create(req.body);
    })
    .then(journey => {
      res.status(201).send({ message: "Journey added!", journey });
    })
    .catch(err => {
      if (err.name === "ValidationError" || err.name === "CastError")
        err.status = 400;
      next(err);
    });
};

const deleteJourney = (req, res, next) => {
  const { journey_id } = req.params;
  Journey.findByIdAndDelete(journey_id)
    .then(journey => {
      if (journey === null)
        throw { status: 404, message: `Journey ${journey_id} not found` };
      res.status(200).send({ journey });
    })
    .catch(err => {
      if (err.name === "CastError") err.status = 400;
      next(err);
    });
};

module.exports = { getAllJourneys, getJourneyById, addJourney, deleteJourney };
