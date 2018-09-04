const apiRouter = require('express').Router();
const home = require('../controllers/home');

apiRouter.route('/').get(home);

module.exports = apiRouter;