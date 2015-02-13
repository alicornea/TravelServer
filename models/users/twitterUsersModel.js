var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.twitterUsersSchema = new mongoose.Schema({
    twitterUserId: String,
    userId: schema.ObjectId
});