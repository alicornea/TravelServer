var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.facebookUsersSchema = new mongoose.Schema({
    facebookUserId: String,
    userId: schema.ObjectId
});