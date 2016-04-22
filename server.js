/*var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);
*/


var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
var passport = require('passport');

 app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

require('./public/Project/Threads/models/Posts');
require('./public/Project/Threads/models/Comments');
require('./public/Project/Threads/models/Users');
require('./public/Project/config/passport');

//mongoose.connect('mongodb://localhost/news');

 var connectionString = 'mongodb://127.0.0.1:27017/webdevelopmentsp16';

 if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
 connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
 process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
 process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
 process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
 process.env.OPENSHIFT_APP_NAME;
 }

 var db = mongoose.connect(connectionString);
 //require("./public/Experiments/Threads/models/Posts.js");
 //require("./public/Experiments/Threads/models/Comments.js");
 require("./public/assignment/server/app.js")(app, mongoose, db );
 require("./public/Project/Threads/models/Posts");
 require("./public/Project/Threads/models/Comments");


 //var routes = require('./public/Experiments/Threads/routes/index.js');
 //var users = require('./public/Experiments/Threads/routes/users');
 //require("./public/Experiments/Threads/js/app.js")(app, mongoose, db);.......

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

 app.listen(port, ipaddress);


//app.listen(3000);
