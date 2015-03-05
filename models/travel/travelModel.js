var mongoose = require('mongoose');

exports.travelSchema = new mongoose.Schema({
    profileId: String,
    leavingFrom: String,
    destination: String,
    flight: String,
    startDate: Date,
    endDate: Date,
    review: String,
    rating: Number,
    attractions: [{
            name: String,
            title: String,
            review: String,
            rating: Number,
            date: Date,
            isEditable: Boolean,
        }]
});