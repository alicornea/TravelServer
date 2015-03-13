var mongoose = require('mongoose');

exports.buddySchema = new mongoose.Schema({
    profileId: String,
    buddy: {
        profileId: String,
        firstName: String,
        lastName: String,
        profileImg: String
    }    
});