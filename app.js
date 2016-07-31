/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var Parse = require('parse/node').Parse;
var express = require('express');
var multer = require('multer');
var done = false;
var fileLink = "";
var extention = "";
var rootUrl = "https://usen.mybluemix.net/";
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
Parse.initialize("pQZBdrued6yX9hdoLqfACQjSW6iTz52CC51EQffS", "6WD3t6pzLxpCLVV9t0ATWh3y6VPOk6CzT8Xt5YYZ");

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

app.use(multer({ dest: './public/uploads/',
 	rename: function (fieldname, filename) {
		fileLink = filename+Date.now();
    	return fileLink;
  	},
	onFileUploadStart: function (file) {
  		console.log(file.originalname + ' is starting ...');
  		var index = file.originalname.lastIndexOf(".");
  		var ext = file.originalname.substring(index).toLowerCase();
  		extention = ext;
	},
	onFileUploadComplete: function (file) {
  		console.log(file.fieldname + ' uploaded to  ' + file.path);
  		done=true;
	}
}));

app.post('/upload',function(req,res){
	if(done===true){
    	console.log(req.files);
    	fileLink = "https://usen.mybluemix.net/uploads/" + fileLink + extention;
		var DataObject = Parse.Object.extend("DataPool");
		var object = new DataObject();
		object.save({
			link: fileLink
		}, {
			success: function(object) {
				console.log("successfully created object");
			},
			error: function(object, error) {
				console.log(error);
			}
		});
		var query = new Parse.Query(DataObject);
		query.equalTo("link", fileLink);
		query.find({
			success: function(results) {
				alert("Successfully retrieved " + results.length + " scores.");
				// Do something with the returned Parse.Object values
				var dataObject = results[0];
				res.end("<!DOCTYPE html><html><link rel=\"stylesheet\" href=\"stylesheets/style.css\"><b>Share this link with your friend!</b><br>"
					+ rootUrl + dataObject.id
					+ "</html>");
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		console.log("parsed");
  	}
});

console.log("before posting");
