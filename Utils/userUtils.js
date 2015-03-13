var jwt = require('jsonwebtoken');
var secret = require('../configs/jwt.json').secret;

exports.returnToken = function (user) {
    var profile = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email != undefined ? user.email : '',
        id: user._id
    };
    
    // We are sending the profile inside the token
    return jwt.sign(profile, secret, {
        expiresInMinutes: 60 * 5
    });
}