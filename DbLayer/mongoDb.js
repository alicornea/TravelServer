var Q = require('q');

exports.initConnection = function() {
    var deferred = Q.defer();
    var mongoose = require('mongoose');
    var config = require('../configs/mongoDbConfig.json');
    var util = require("util");
    var connectionString = util.format(config.url, config.username, config.password);

    mongoose.connection.on("open", function(ref) {
        return console.log("Connected to mongo server!");
    });

    mongoose.connection.on("error", function(err) {
        console.log("Could not connect to mongo server : " + err);
    });

    try {
        if (mongoose.connection.readyState > 0) //connection not closed
            return deferred.resolve(mongoose.connection).promise;
            
        mongoose.connect(connectionString);
        console.log("Started connection on " + (connectionString) + ", waiting for it to open...");
        return deferred.resolve(mongoose.connection).promise;
    }
    catch (err) {
        console.log(("Setting up failed to connect to " + connectionString), err.message);
    }

    return null;
};