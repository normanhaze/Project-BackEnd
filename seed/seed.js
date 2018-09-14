const mongoose = require('mongoose');
const User = require('../models/User');
const Journey = require('../models/Journey');

const seedDB = (userData, journeyData) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
        return Promise.all([
            User.insertMany(userData),
            Journey.insertMany(journeyData) 
        ]);  
    });
};

module.exports = seedDB;