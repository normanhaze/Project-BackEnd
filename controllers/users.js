const User = require('../models/User');
const Journey = require('../models/Journey');

const getAllUsers = (req, res, next) => {
    User.find()
    .then(allUsers => {
        res.status(200).send({ allUsers });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {;
    const { username } = req.params;
    User.find({ username })
    .then(user => {
        if (user.length) user = user[0]
        res.status(200).send({ user });
    })
    .catch(next);
};

const getJourneysByUser = (req, res, next) => {
    const { username } = req.params;
    User.find({ username })
    .then(user => {  
        if (user.length === 0) throw { status: 404, message: `User ${username} not found` };
        return Journey.find({ user: username })
    })
    .then(journeys => {
        console.log(journeys, "journeys");
        res.status(200).send({ journeys });
    })
    .catch(err => {
        if (err.name === 'CastError') err.status = 400;
        next(err);
    });
};

module.exports = { getAllUsers, getUserByUsername, getJourneysByUser };
