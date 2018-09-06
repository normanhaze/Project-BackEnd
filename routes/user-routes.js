const userRouter = require('express').Router();
const { getAllUsers, getUserByUsername, getJourneysByUser, addUser } = require('../controllers/users');

userRouter.route('/')
.get(getAllUsers)
.post(addUser);

userRouter.route('/:username')
.get(getUserByUsername);

userRouter.route('/:username/journeys')
.get(getJourneysByUser);

module.exports = userRouter;