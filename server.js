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

 app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

 var connectionString = 'mongodb://127.0.0.1:27017/webdevelopmentsp16';

 if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
 connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
 process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
 process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
 process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
 process.env.OPENSHIFT_APP_NAME;
 }

 var db = mongoose.connect(connectionString);
 //require("./public/Experiments/Threads/models/posts.js");
 //require("./public/Experiments/Threads/models/comments.js");
 require("./public/assignment/server/app.js")(app, mongoose, db );
 //require("./public/Project/Threads/model/posts.js");
 //require("./public/Project/Threads/model/posts.js");

 //var routes = require('./public/Experiments/Threads/routes/index.js');
 //var users = require('./public/Experiments/Threads/routes/users');
 //require("./public/Experiments/Threads/js/app.js")(app, mongoose, db);.......

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

 app.listen(port, ipaddress);

