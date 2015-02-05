
var db = require('../DbLayer/mongoDb.js').initConnection();
var dashboardSchema = require('../models/dashboard/dashboardModel.js').dashboardSchema;
var dashboardModel = db.model('dashboard', dashboardSchema);

exports.show = function(req, res) {
   // res.send('show user ' + req.params.dashboard);
    dashboardModel.find( {
        userId: req.params.dashboard
    }, function(error, doc) {
        if (doc)
            res.json(doc);
        else if (error)
            res.json({
                error: error
            });
        else
            res.send('user not found');
    });
    /*
    users.find({
        username: req.params.username
    }, function(error, doc) {
        if (doc)
            res.json(doc);
        else if (error)
            res.json({
                error: error
            });
        else
            res.send('user not found');
    });*/
};


exports.create = function(req, res) {
    var newDashboard = new dashboardModel({
        userId: req.body.userId,
        dashboard_setup: req.body.dashboard_setup
    });
console.log(req.body);
    newDashboard.save(function(err) {
        if (err) {
            console.log("Error while creating new bashboard: " + err);
            return res.send({
                error: err
            });
        } else {
            console.log("Dashboard created with success");
            return res.send({ status: 'OK'});
        }
    });
};

exports.update = function(req, res) {
    res.send('handle form to edit user ' + req.params.user);
};

exports.destroy = function(req, res) {
    res.send('delete user ' + req.params.user);
};