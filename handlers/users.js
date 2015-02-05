var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://gigi:gigi@ds051977.mongolab.com:51977/test_cluj');
var usersSchema = require('../models/users/usersModel.js').usersSchema;
var users = db.model('users', usersSchema);

exports.index = function(req, res) {
    users.find({}, function(error, doc) {
        if (doc)
            res.json(doc);
        else if (error)
            res.json({
                error: error
            });
        else
            res.send('user not found');
    });
};

exports.new = function(req, res) {
    res.send('form for new user');
};

exports.create = function(req, res) {
    res.send('handle form for new user');
};

exports.show = function(req, res) {
    users.findById(req.params.user, function(error, doc) {
        if (doc)
            res.json(doc);
        else if (error)
            res.json({
                error: error
            });
        else
            res.send('user not found');
    });
};

exports.edit = function(req, res) {
    res.send('form to edit user ' + req.params.user);
};

exports.update = function(req, res) {
    res.send('handle form to edit user ' + req.params.user);
};

exports.destroy = function(req, res) {
    res.send('delete user ' + req.params.user);
};