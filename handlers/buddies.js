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

exports.create = function (req, res) {
    buddyModel.save({
        profileId: req.params.profileId,
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        profileImg: req.params.profileImg
    }, function (err, result) {
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