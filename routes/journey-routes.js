const journeyRouter = require('express').Router();
const { getAllJourneys, getJourneyById, addJourney, deleteJourney } = require('../controllers/journeys');

journeyRouter.route('/')
.get(getAllJourneys)
.post(addJourney);

journeyRouter.route('/:journey_id')
.get(getJourneyById)
.delete(deleteJourney);

module.exports = journeyRouter; 