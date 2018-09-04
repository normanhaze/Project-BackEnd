const mongoose = require('mongoose');
const User = require('../models/User');
const Route = require('../models/Route');

const seedDB = (userData, routeData) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
        return Promise.all([
            User.insertMany(userData),
            Route.insertMany(routeData) 
        ]);  
    });
};

module.exports = seedDB;