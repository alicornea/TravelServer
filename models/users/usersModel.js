var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.usersSchema = new mongoose.Schema({
    _id: schema.ObjectId,
    username: 'String',
    passsword: 'String'
});