var mongoose = require('mongoose');
var schema = mongoose.Schema;

exports.dashboardSchema = new mongoose.Schema({
   
    userId: schema.ObjectId,
    dashboard_setup: 'String'
});