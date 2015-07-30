var mongoose = require('mongoose'); //importing mongoose

// define schema (structure) for the Event
var EventSchema = mongoose.Schema({
  name: String,      //name
  location: String,  //location
  startdate: Date,   //date start
  enddate: Date,     //date end
  email: String,     //mail
  summary: String,    // summary
  imageurl: String    // image
});

// Event Model
var Event = mongoose.model('Event', EventSchema);

module.exports = Event;      // export Event Model