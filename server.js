var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')

// express-namespace should be loaded before app is instantiated
var namespace = require('express-namespace');
var resource = require('express-resource');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Pass the Express instance to the routes module
var routes = require('./routes')(app);

// Load the resourceful route handler
app.resource('users', require('./handlers/users.js'));
app.resource('travels', require('./handlers/travels.js'));

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);


/*app.get("/getAllDocuments", function(req, res) {

    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');
    // Connection URL 
    var url = 'mongodb://ali:ali@ds051977.mongolab.com:51977/test_cluj';
    console.log("ce faci"); // Use connect method to connect to the Server 
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        findDocuments(db, function(data) {
            res.send(data);
            db.close();
        });

    });

    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('travels');
        // Insert some documents
        collection.find({}).toArray(function(err, docs) {

            assert.equal(err, null);

            console.log("Found the following records");
            console.dir(docs)
            callback(docs);
        });
    }



});


app.get('/insert', function(req, res) {


    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');
    // Connection URL 
    var url = 'mongodb://ali:ali@ds051977.mongolab.com:51977/test_cluj';
    console.log("ce faci"); // Use connect method to connect to the Server 
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        insertDocuments(db, function() {
            console.log("uite aici");
            db.close();
        });
        db.close();
    });
    var insertDocuments = function(db, callback) {
        // Get the documents collection 
        var collection = db.collection('travels');
        // Insert some documents 
        collection.insert([{
            a: 11
        }, {
            a: 22
        }, {
            a: 33
        }], function(err, result) {
            assert.equal(err, null);
            console.log(result);
            console.log(err);
            // assert.equal(3, result.result.n); 
            // assert.equal(3, result.ops.length); 
            console.log("Inserted 3 document into the document collection");
            callback(result);
        });
    }






    res.send('Inserted some hardcoded stuff');
});*/