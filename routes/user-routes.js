const userRouter = require('express').Router();
const { getAllUsers, getUserByUsername, getJourneysByUser } = require('../controllers/users');

userRouter.route('/')
.get(getAllUsers);

userRouter.route('/:username')
.get(getUserByUsername);

userRouter.route('/:username/journeys')
.get(getJourneysByUser);

module.exports = userRouter;