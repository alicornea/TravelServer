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

/* Change password errors
     * 1 - user current password incorrect
     * 2 - user not found
*/
exports.changePassword = function (req, res) {
    users.findById(req.body.userId, function (error, doc) {
        if (doc) { //we found the user - check current password
            if (doc.password == req.body.currentPassword) {
                //var user = new users(doc);
                doc.password = req.body.newPassword;
                doc.save(function (error, userDoc) {
                    if (error) {
                        console.log("Error while updating password: " + error);
                        return res.json({ errorCode : '2' });
                    }
                    else {
                        res.json({ status : 'Password updated' });
                    }
                });
            }
            else
                res.json({ errorCode : '1' });
        }
        else
            res.json({ errorCode : '2' });
    });
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

/* Update user errors
     * 1 - user not found
     * 2 - error while updating user
*/
exports.update = function (req, res) {
    users.findById(req.body._id, function (error, doc) {
        if (doc) { //we found the user
            doc.first_name = req.body.first_name;
            doc.last_name = req.body.last_name;
            doc.email = req.body.email;
            doc.save(function (error, userDoc) {
                if (error) {
                    console.log("Error while updating user details: " + error);
                    return res.json({ errorCode : '2' });
                }
                else {
                    res.json({ status : 'User updated' });
                }
            });
        }
        else
            res.json({ errorCode : '1' });
    });
};

exports.destroy = function (req, res) {
    res.send('delete user ' + req.params.user);
};