const mongoose = require('mongoose');
const { Schema } = mongoose;

const RouteSchema = new Schema({
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
        ref: 'routes'
    }]
});

module.exports = mongoose.model('routes', RouteSchema);