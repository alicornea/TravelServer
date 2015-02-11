var db = require('./mongoDb.js').initConnection();
var twitterUsersSchema = require('../models/users/twitterUsersModel.js').twitterUsersSchema;
var twitterUsers = db.model('twitterUsers', twitterUsersSchema);

exports.create = function(twitterId, user, cb) {
    var newTwitterUser = new twitterUsers({
        twitterUserId: twitterId,
        userId: user._id
    });

    newTwitterUser.save(cb);
};

exports.find = function(twitterUserId, cb) {
    twitterUsers.find({
        "twitterUserId": twitterUserId
    }, cb);
};