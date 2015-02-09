var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.twitterUsersSchema = new mongoose.Schema({
    twitterkUserId: String,
    userId: schema.ObjectId
});