var express = require('express'),
    app = express();

var logger = require('morgan');
app.use(logger('dev')); 

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get("/getAllDocuments", function(req, res) {

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
});



app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);