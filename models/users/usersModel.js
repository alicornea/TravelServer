var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.usersSchema = new mongoose.Schema({
    username: 'String',
    password: 'String',
    first_name: 'String',
    last_name: 'String',
    email: 'String'
});