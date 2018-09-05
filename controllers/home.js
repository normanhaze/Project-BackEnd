const routeData = require('../homepage.json');

const home = (req, res, next) => {
    res.status(200).send(routeData);
};

module.exports = home;