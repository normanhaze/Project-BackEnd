const User = require("../models/User");
const Journey = require("../models/Journey");

const getAllUsers = (req, res, next) => {
  User.find()
    .then(allUsers => {
      const allUsernames = allUsers.map(user => user.username);
      res.status(200).send({ allUsernames });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .then(user => {
      if (user.length) user = user[0];
      if (req.query.password) {
        if (req.query.password === user.password) res.status(200).send({message: "Password accepted"});
        else res.status(400).send({message: "Incorrect password"})
      } else {
      res.status(200).send({ user: user.username });
      };
    })
    .catch(next);
};

const getJourneysByUser = (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .then(user => {
      if (user.length === 0)
        throw { status: 404, message: `User ${username} not found` };
      return Journey.find({ user: username });
    })
    .then(journeys => {
      res.status(200).send({ journeys });
    })
    .catch(err => {
      if (err.name === "CastError") err.status = 400;
      next(err);
    });
};

const addUser = (req, res, next) => {
  User.find({username: req.body.username}) 
  .then(user => {
    if (user.length) throw {status: 400, message: `User ${req.body.username} already exists`};
    return User.create(req.body);
  })
  .then(user => {
    res.status(201).send({message: "User added!", user: user.username})
  })
  .catch(err => {
    if (err.name === "ValidationError" || err.name === "CastError")
      err.status = 400;
    next(err);
  });
}

module.exports = { getAllUsers, getUserByUsername, getJourneysByUser, addUser };
