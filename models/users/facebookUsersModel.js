var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.facebookUsersSchema = new mongoose.Schema({
    _id: schema.ObjectId,
    facebookUserId: schema.ObjectId,
    userId: schema.ObjectId
});