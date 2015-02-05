var db = require('./mongoDb.js').initConnection();
var facebookUsersSchema = require('../models/users/facebookUsersModel.js').facebookUsersSchema;
var facebookUsers = db.model('facebookUsers', facebookUsersSchema);

exports.create = function(facebookUserId, userId) {

};

exports.find = function(facebookUserId) {
    facebookUsers.find({
        facebookUserId: facebookUserId
    }, function(error, doc) {
        return doc;
    });
};