// importing node modules
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');

//importing mongo db event schema , in this app event is the schema for events collection
var Event = require('./db/Event');


// dbname - eventdb
mongoose.connect('mongodb://localhost/testeventdb');

//userapp

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Get all events  (created api to provide data from database to user through http req ,res)
app.get('/api/events', function(req, res) {                       //send the req to events collection
  Event.find({}, function(err, docs) {                         // find the event data from events coll
    if(!err) res.json(200, docs);                                 // if no err , send it as JSON
    else res.send(500);
  });
});


// Get event by user email
app.get('/api/events/user/:email' , function(req, res) {
  Event.find({ email: req.params.email }, function(err, docs) {
    if(!err) res.json(200, docs);
    else res.send(500);
  });
});


// Get event by id
app.get('/api/events/:id', function(req, res) {
  Event.findById(req.params.id, function(err, doc) {
    if(!err) res.json(200, doc);
    else res.send(500);
  });
});


// Create new event
//  see here http://howtonode.org/really-simple-file-uploads
app.post('/api/events', function(req, res) {
  //console.log(req.body);
  var eventData = req.body;
  
  // new filename for uploaded image
  var newFileName = req.body.name.replace(/\s/g, '') 
                    + '_' + req.body.location.replace(/\s/g, '');  
  
  // add the imageurl to event object
  eventData.imageurl = '/uploads/' + newFileName;
  
  // move the image from /tmp to /uploads
  fs.readFile(req.files.eventimage.path, function (err, data) {
    var newPath = __dirname + "/public/uploads/" + newFileName;
    fs.writeFile(newPath, data, function (err) {});
  });
  
  // create event model 
  var event = new Event(eventData);
  
  // save to database
  event.save(function(err) {
    if(!err) res.redirect("/");
    else res.send(500);
  });
});

// Delete an event
app.del('/api/events/:id', function(req, res) {
  
  Event.findByIdAndRemove(req.params.id, function(err, doc) {
    
    // delete the event image
    fs.unlink('./public' + doc.imageurl, function(err) {
      res.end();
    });
        
  });
});

// Start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
