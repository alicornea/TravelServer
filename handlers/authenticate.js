var db = require('../DbLayer/mongoDb.js').initConnection();
var usersSchema = require('../models/users/usersModel.js').usersSchema;
var users = db.model('users', usersSchema);
var userUtils = require('../Utils/userUtils.js');

exports.authenticate = function (req, res) {
    users.find({
        username: req.body.username,
        password: req.body.password
    }, function (error, doc) {
        if (error) {
            res.status(401).send('Wrong user or password');
            return;
        }
        else {
            if (doc.length == 0) {
                res.status(401).send('Wrong user or password');
                return;
            }
            
            res.json({
                token: userUtils.returnToken(doc[0])
            });
        }
    });
};

exports.authenticateViaFacebook = function (req, res) {
    try {
        require('../DbLayer/facebookUsers.js').find(req.body.id, function (error, doc) {
            if (doc && doc.length > 0) {
                users.findById(doc[0].userId, function (error, doc) { //get the corresponding user for the FB user
                    if (doc)
                        res.json({
                            token: userUtils.returnToken(doc)
                        });
                    return null;
                })
            }
            else { //we need to create a new user corresponding to the FB user
                require('./users.js').createFromSocialNetowrk(req, function (error, userDoc, affected) {
                    if (error) {
                        console.log("Error while creating user: " + error);
                    }
                    else { //user created, link to FB account
                        require('../DbLayer/facebookUsers.js').create(req.body.id, userDoc, function (error, doc, affected) {
                            res.json({
                                token: userUtils.returnToken(userDoc)
                            });
                        });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

exports.authenticateViaTwitter = function (req, res) {
    try {
        require('../DbLayer/twitterUsers.js').find(req.body.id, function (error, doc) {
            if (doc && doc.length > 0) {
                users.findById(doc[0].userId, function (error, doc) { //get the corresponding user for the Twitter user
                    if (doc)
                        res.json({
                            token: userUtils.returnToken(doc)
                        });
                    return null;
                })
            }
            else { //we need to create a new user corresponding to the Twitter user
                require('./users.js').createFromSocialNetowrk(req, function (error, userDoc, affected) {
                    if (error) {
                        console.log("Error while creating user: " + error);
                    }
                    else { //user created, link to Twitter account
                        require('../DbLayer/twitterUsers.js').create(req.body.id, userDoc, function (error, doc, affected) {
                            res.json({
                                token: userUtils.returnToken(userDoc)
                            });
                        });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}