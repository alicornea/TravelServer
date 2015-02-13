var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')

// express-namespace should be loaded before app is instantiated
var namespace = require('express-namespace');
var resource = require('express-resource');


var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    next();
});

// We are going to protect /api routes with JWT
var secret = require('./configs/jwt.json').secret;
app.use('/api', expressJwt({
    secret: secret
}));

app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

// Pass the Express instance to the routes module
var routes = require('./routes')(app);

// Load the resourceful route handler
app.resource('api/users', require('./handlers/users.js'));
app.resource('travels', require('./handlers/travels.js'));
app.resource('dashboard', require('./handlers/dashboard.js'));

var server = app.listen(process.env.PORT);

console.log('Express server started on port %s', process.env.PORT);
