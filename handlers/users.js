var db = require('../DbLayer/mongoDb.js').initConnection();
var usersSchema = require('../models/users/usersModel.js').usersSchema;
var users = db.model('users', usersSchema);
var userUtils = require('../Utils/userUtils.js');

exports.index = function (req, res) {
    users.find({}, function (error, doc) {
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

exports.create = function (req, res) {
    
    /* Registration via our app - check for existing user
     * Errors :
     * 1 - general error
     * 2 - existing user
     * 3 - error creating user
    */
     users.find({ username: req.body.username }, function (error, doc) {
        if (doc && doc.length > 0)
            return res.json({ errorCode : '2' });
        else if (error)
            return res.json({ errorCode : '1' });
        else {
            var newUser = new users({
                username: req.body.username,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            });
            
            newUser.save(function (error, userDoc) {
                if (error) {
                    console.log("Error while creating user: " + error);
                    return res.json({ errorCode : '2' });
                }
                else {
                    console.log("user created with success");
                    res.json({
                        token: userUtils.returnToken(userDoc)
                    });
                }
            });
        }
    });
};

exports.createFromSocialNetowrk = function (req, cb) {
    var newUser = new users({
        username: '',
        password: '',
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: ''
    });
    
    newUser.save(cb);
};

exports.show = function (req, res) {
    users.findById(req.params.user, function (error, doc) {
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

exports.edit = function (req, res) {
    res.send('form to edit user ' + req.params.user);
};

exports.update = function (req, res) {
    res.send('handle form to edit user ' + req.params.user);
};

exports.destroy = function (req, res) {
    res.send('delete user ' + req.params.user);
};