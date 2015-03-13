// Load the route handlers
var routes = require('./handlers');
var users = require('./handlers/users');
var authenticate = require('./handlers/authenticate');
var travels = require('./handlers/travels');
var buddies = require('./handlers/buddies.js');

module.exports = function (app) {
    app.get('/', routes.index);
    
    app.post('/authenticate', authenticate.authenticate);
    app.post('/authenticateViaFacebook', authenticate.authenticateViaFacebook);
    app.post('/authenticateViaTwitter', authenticate.authenticateViaTwitter);
    
    app.post('/register', users.create);
    app.get('/api/travels/getTravelsByProfileId/:profileId', travels.getTravelsByProfileId);
    
    /* Buddies methods */
    app.get('/api/buddies/getBuddies/:profileId', buddies.getBuddies);
    app.post('/api/buddies/removeBuddy', buddies.removeBuddy)
}