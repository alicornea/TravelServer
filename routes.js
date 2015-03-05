// Load the route handlers
var routes = require('./handlers');
var users = require('./handlers/users');
var authenticate = require('./handlers/authenticate');
var travels = require('./handlers/travels');

module.exports = function(app) {
    app.get('/', routes.index);

    app.post('/authenticate', authenticate.authenticate);
    app.post('/authenticateViaFacebook', authenticate.authenticateViaFacebook);
    app.post('/authenticateViaTwitter', authenticate.authenticateViaTwitter);
    app.get('/api/travels/getTravelsByProfileId/:profileId', travels.getTravelsByProfileId);
}