
var db = require('../DbLayer/mongoDb.js').initConnection();

var travelSchema = require('../models/travel/travelModel.js').travelSchema;
var travelModel = db.model('travels', travelSchema);

exports.index = function(req, res) {
    return travelModel.find(function(err, travels){
        if(travels.length === 0){
            return res.send({ statusCode: 500, messsae: 'No travels available for this user'});
        } else if(err){
            res.statusCode = 501;
            console.log('Internal error (%d): %s', res.statusCode, err.message);
            return;
        } else {
            return res.json(travels); 
        }
    });
};

exports.create = function(req, res) {
    console.log(req);
    var newTravel = new travelModel({
        user: "nada for the moment",
        leavingFrom: req.body.leavingFrom,
        destination: req.body.destination,
        flight: req.body.flight,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        review: req.body.review,
        rating: req.body.rating,
        visitedPlaces: req.body.visitedPlaces
    });

    newTravel.save(function(err) {
        if (err) {
            console.log("Error while creating new travel: " + err);
            return res.send({
                error: err
            });
        } else {
            console.log("Trave created with success");
            return res.send({ status: 'OK'});
        }
    });
};
