// Database to store data, don't forget autoload: true
var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

var express = require('express')
var app = express()

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.redirect('/show');
});

app.get('/track', function (req, res) {
	res.redirect('location_tracking.html');
});

app.get('/show', function(req, res) {
	res.redirect('show_locations.html');
});

app.get('/savelocation', function (req, res) {		
	// Insert the data into the database
	db.insert(req.query, function (err, newDocs) {
		console.log("err: " + err);
		console.log("newDocs: " + newDocs);
		
		res.send('thanks');
	});
});

app.get('/getlocations', function(req, res) {
	// Find all of the existing docs in the database
	db.find({}, function(err, docs) {
		res.send(docs);
	});
});


var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);
