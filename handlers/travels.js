var db = require('../DbLayer/mongoDb.js').initConnection();
var ObjectId = require('mongoose').Schema.ObjectId;

var travelSchema = require('../models/travel/travelModel.js').travelSchema;
var travelModel = db.model('travels', travelSchema);

exports.index = function(req, res) {
    return travelModel.find(function(err, travels) {
        if (err) {
            console.log("error getting the travels");
            return res.send({
                hasError: true,
                error: err
                });
        }
        else {
            console.log("Travels retreived from db");
            return res.json(travels);
        }
    });
};

exports.create = function(req, res) {
    var newTravel = new travelModel({
        user: "nada for the moment",
        leavingFrom: req.body.leavingFrom,
        destination: req.body.destination,
        flight: req.body.flight,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        review: req.body.review,
        rating: req.body.rating,
        attractions: req.body.atractions
    });

    newTravel.save(function(err) {
        if (err) {
            console.log("Error while creating new travel: " + err);
            return res.send({
                harError: true,
                error: err
            });
        }
        else {
            console.log("Trave created with success");
            return res.send({
                status: 'OK'
            });
        }
    });
};

exports.destroy = function(req, res) {
    
    travelModel.remove({ _id: req.params.travel }, function(err, doc) {
        if (!err) {
            return res.send({
                status: 'OK'
            });
        }

        console.log("Error while removing travel: " + err);
        res.send({
            hasError: true,
            error: err
        });
        
    });
};
