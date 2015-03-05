var mongoose = require('mongoose');

exports.buddySchema = new mongoose.Schema({
    profileId: String,
    firstName: String,
    lastName: String,
    profileImg: String
});