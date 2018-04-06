// List of dependencies are as follows
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

// Designate our public folder as a static directory
app.use(express.static(__dirname + '/public'));

// connect Handlebars to our Express app
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));


// Save MongoDB directory to a db var
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.Promise = Promise;
mongoose.connect(db, {
  useMongoClient: true
});

// bring in our routes file into the the server files
var routes = require('./config/route.js');

// Incorporate these routes into our app
app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);
// Not sure if this port will work with the DB. Might need fixing
var port = process.env.PORT || 3000;

// set our app to listen on the port.
app.listen(port, function() {
    console.log("lisenting on port:" + port);
});
