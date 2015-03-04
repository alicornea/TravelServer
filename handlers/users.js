var db = require('../DbLayer/mongoDb.js').initConnection();
var usersSchema = require('../models/users/usersModel.js').usersSchema;
var users = db.model('users', usersSchema);

exports.getUserByUserName = function(req, res) {
    users.find({
        username: req.params.username
    }, function(error, doc) {
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

exports.create = function(req, cb) {
    var newUser = new users({
        username: '',
        password: '',
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: ''
    });

    newUser.save(cb);
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