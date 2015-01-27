// Load the route handlers
var routes = require('./handlers');
var users = require('./handlers/users');

module.exports = function(app) {

    // Define the routes
    app.get('/', routes.index);
    app.namespace('/users', function() {
        app.get('/getByUsername/:username', users.getUserByUserName);
    });
}