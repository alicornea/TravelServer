var db = require('./mongoDb.js').initConnection();
var facebookUsersSchema = require('../models/users/facebookUsersModel.js').facebookUsersSchema;
var facebookUsers = db.model('facebookUsers', facebookUsersSchema);

exports.create = function(fbId, user, cb) {
    var newFbUser = new facebookUsers({
        facebookUserId: fbId,
        userId: user._id
    });

    newFbUser.save(cb);
};

exports.find = function(facebookUserId, cb) {
    facebookUsers.find({
        "facebookUserId": facebookUserId
    }, cb);
};