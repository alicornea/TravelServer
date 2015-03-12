var db = require('../DbLayer/mongoDb').initConnection();
var buddySchema = require('../models/buddies/buddyModel').buddySchema;
var buddyModel = db.model('buddies', buddySchema);


exports.index = function (req, res) {
    return buddyModel.find(function (err, buddies) {
        if (err) {
            console.log("error getting the buddies");
            return res.send({
                hasError: true,
                error: err
            });
        } else {
            console.log("Buddies retreived from db");
            return res.json(buddies);
        }
    });
};

exports.getBuddies = function (req, res) {
    return buddyModel.find({ profileId: req.params.profileId }, function (err, buddies) {
        if (err) {
            console.log("error getting the buddies");
            return res.send({
                hasError: true,
                error: err
            });
        } else {
            console.log("Buddies retreived from db");
            return res.json(buddies);
        }
    });
};

exports.create = function (req, res) {
    var newBuddyModel = new buddyModel({
        profileId: req.body.profileId,
        buddy: {
            profileId: req.body.buddy.profileId,
            firstName: req.body.buddy.firstName,
            lastName: req.body.buddy.lastName,
            profileImg: req.body.buddy.profileImg
        }
    });
    
    newBuddyModel.save(function (err, result) {
        if (err) {
            res.json({
                hasError: true,
                error: err
            });
        } else {
            return res.send({
                status: 'OK'
            });
        }
    });
};

exports.removeBuddy = function (req, res) {
    buddyModel.findOneAndRemove({
        profileId: req.body.profileId,
        buddy: {
            profileId: req.body.buddy.profileId,
            firstName: req.body.buddy.firstName,
            lastName: req.body.buddy.lastName,
            profileImg: req.body.buddy.profileImg
        }
    }, function (err) {
        if (err) {
            res.json({
                hasError: true,
                error: err
            });
        } else {
            return res.send({
                status: 'OK'
            });
        }        ;
    });
};
