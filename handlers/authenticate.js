var db = require('../DbLayer/mongoDb.js').initConnection();
var usersSchema = require('../models/users/usersModel.js').usersSchema;
var users = db.model('users', usersSchema);
var jwt = require('jsonwebtoken');
var secret = require('../configs/jwt.json').secret;

exports.authenticate = function(req, res) {
    users.find({
        username: req.body.username,
        password: req.body.password
    }, function(error, doc) {
        if (error) {
            res.status(401).send('Wrong user or password');
            return;
        }
        else {
            if (doc.length == 0) {
                res.status(401).send('Wrong user or password');
                return;
            }

            var profile = {
                first_name: doc[0].first_name,
                last_name: doc[0].last_name,
                email: doc[0].email,
                id: doc[0]._id
            };

            // We are sending the profile inside the token
            var token = jwt.sign(profile, secret, {
                expiresInMinutes: 60 * 5
            });

            res.json({
                token: token
            });
        }
    });
};

exports.authenticateViaFacebook = function(req, res) {

    var user = {};
    require('../DbLayer/facebookUsers.js').find({
        "facebookUserId": req.body.id
    }, function(error, doc) {
        if (error)
            console.log(error);
        if (doc.length > 0) { //existing user
            console.log('existing user');
            user = getUserById(doc[0].userId);
            console.log('get user' + user);
        }
        else { //we need to create a new user corresponding to the Fb user
            user = createUser(req.body);
            console.log('created user : ' + user);
        }
    });
    var profile = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        id: user._id
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, secret, {
        expiresInMinutes: 60 * 5
    });
console.log('final user ' + user);
    res.json({
        token: token
    });
}

function getUserById(userId) {
    users.findById(userId, function(error, doc) {
        if (doc)
            return doc[0];
        else return {};
    })
};

function createUser(userInfo) {
    var user = new users({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
    });

    user.save(function(error, user, affected) {
        if (!error)
            return user;
        else {
            console.log(error);
            return {};
        }
    });
}
