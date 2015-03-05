var db = require('../DbLayer/mongoDb.js').initConnection();
var ObjectId = require('mongoose').Schema.ObjectId;

var travelSchema = require('../models/travel/travelModel.js').travelSchema;
var travelModel = db.model('travels', travelSchema);

exports.index = function (req, res) {
    travelModel.find(function (err, travels) {
        if (err) {
            console.log("error getting the travels");
            return res.send({
                hasError: true,
                error: err
            });
        } else {
            console.log("Travels retreived from db");
            return res.json(travels);
        }
    });
};

exports.getTravelsByProfileId = function (req, res) {
    return travelModel.find({ profileId: req.params.profileId }, function (err, travels) {
        if (err) {
            console.log("error getting user's travels");
            return res.send({
                hasError: true,
                error: err
            });
        } else {
            return res.json(travels);
        }
    });
};

exports.create = function (req, res) {
    var newTravel = createTravelDbModel(req);
    
    newTravel.save(function (err) {
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

exports.destroy = function (req, res) {
    
    travelModel.remove({
        _id: req.params.travel
    }, function (err, doc) {
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

exports.update = function (req, res) {
    var travelToUpdate = createTravelDbModel(req).toObject();
    delete travelToUpdate._id;
    
    travelModel.update({
        _id: req.params.travel
    }, travelToUpdate, {}, function (err, doc) {
        if (!err) {
            console.log(doc);
            return res.send({
                status: 'OK'
            });
        }
        
        console.log("Error while adding new attraction: " + err);
        res.send({
            hasError: true,
            error: err
        });
    });
};

function createTravelDbModel(req) {
    return new travelModel({
        profileId: req.body.profileId,
        leavingFrom: req.body.leavingFrom,
        destination: req.body.destination,
        flight: req.body.flight,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        review: req.body.review,
        rating: req.body.rating,
        attractions: createAttractionModel(req)
    });
}

function createAttractionModel(req) {
    var attractions = req.body.attractions;
    for (var i = 0; i < attractions.length; i++) {
        attractions[i].isEditable = false;
    }
    
    return attractions;
}