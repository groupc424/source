var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mongodb database
mongoose.Promise = global.Promise;

//set your mongodb database
mongoose.connect('mongodb://localhost/data',{useMongoClient: true});
//swrich to meowspace if needed
//mongodb://localhost/data/db/


//Mongoclient.db = connect("localhost:27017/mydb");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



//require routes
var userRouter = require('./route/user-router');
var postRouter = require('./route/post-router');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//set routes
app.use('/user',userRouter);
app.use('/post',postRouter);

module.exports = app;
