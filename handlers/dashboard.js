var db = require('../DbLayer/mongoDb.js').initConnection(function(err, connection) {
    db = connection;
});
var dashboardSchema = require('../models/dashboard/dashboardModel.js').dashboardSchema;
var dashboardModel = db.model('dashboard', dashboardSchema);

exports.show = function(req, res) {

    dashboardModel.find({
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

};


exports.create = function(req, res) {
    console.log(req.body);
    var newDashboard = new dashboardModel({
        userId: req.body.userId,
        dashboard_setup: JSON.stringify(req.body.dashboard_setup)
    });

    newDashboard.save(function(err) {
        if (err) {
            console.log("Error while creating new bashboard: " + err);
            return res.send({
                error: err
            });
        }
        else {
            console.log("Dashboard created with success");
            return res.send({
                status: 'OK'
            });
        }
    });
};

exports.update = function(req, res) {



    dashboardModel.find({
        _id: req.params.dashboard
    }, function(error, doc) {
        if (doc) {
            var obj = {
                userId: req.body[0].userId,
                dashboard_setup: JSON.stringify(req.body[0].dashboard_setup)
            }
            dashboardModel.update(doc[0], obj, function(err, mod) {
                console.log(err)
                 res.send('ok');
            });
        }

        else if (error)
            res.json({
                error: error
            });
        else
            res.send('user not found');
    });





    /* var updateDashboard = new dashboardModel({
         _id  : req.body[0]._id,
         userId: req.body[0].userId,
         dashboard_setup: JSON.stringify(req.body[0].dashboard_setup)
     });
     
     
     
     
     console.log(updateDashboard);
     updateDashboard.update( {_id:req.params.dashboard},function(err, affected) {
         console.log(err);
         console.log('affected rows %d', affected);
     });
     
      res.json({
                 status : "OK"
             });*/
};

exports.destroy = function(req, res) {
    res.send('delete user ' + req.params.user);
};