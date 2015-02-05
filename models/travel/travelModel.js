var mongoose = require('mongoose');

exports.travelSchema = new mongoose.Schema({
    user: String,
    leavingFrom: String,
    destination: String,
    flight: String,
    startDate: Date,
    endDate: Date,
    review: String,
    rating: Number,
    visitedPlaces: [{
        name: String,
        review: String,
        rating: Number
    }]
});