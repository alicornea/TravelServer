var mongoose = require('mongoose');
var config = require('../configs/mongoDbConfig.json');
var util = require("util");
var connectionString = util.format(config.url, config.username, config.password);
var retry = 0;

mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function(err) {
    retry++;
    console.log("Could not connect to mongo server : " + err);
    if (retry > 5)
        return;

    console.log("Retry " + retry + "...");
    setTimeout(prepareConnection(), 5000);
});

prepareConnection();

exports.initConnection = function() {
    try {
        if (mongoose.connection.readyState > 0) //connection not closed
            return mongoose.connection

        prepareConnection();

        return mongoose.connection;
    }
    catch (err) {
        console.log(("Setting up failed to connect to " + connectionString), err.message);
    }
}

function prepareConnection() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
    mongoose.disconnect();
    mongoose.connect(connectionString, options);
    console.log("Started connection on " + (connectionString) + ", waiting for it to open...");
}

process.on("exit", function() {
    console.log("afara")
    mongoose.disconnect();
});

process.on('SIGINT', function() {
    mongoose.disconnect();
    console.log("dead process")
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});