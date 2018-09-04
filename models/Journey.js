const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeySchema = new Schema({
    user: {
        type: String,
        ref: 'users',
        required: 'true'
    },
    route: [
        {
            latLng: {
               latitude: {
                   type: Number,
                   required: true
               },
               longitude: {
                   type: Number,
                   required: true
                }
            },
            timestamp: Date,
            strokeWidth: Number,
            strokeColor: String,
            newSection: {
                type: Boolean,
                required: true
            }
        }
    ],
    image: String,
    previousVersions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'journeys'
    }]
});

module.exports = mongoose.model('journeys', journeySchema);