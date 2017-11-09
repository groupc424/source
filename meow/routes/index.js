var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req,res){
var MongoClient = mongodb.MongoClient;

//where db server is
var url = 'mongodb://localhost: 27017/meow';
//connect to server
mongoClient.db = connect(url, function(error, db){
  if (err){
    console.log('Unable to connect to the server', err );
  }else {
    //connected
    console.log("connection established");
    //get doc colletion
    var collection = db.collection('user');

    //find all users
    collection.find({}).toArray(function(err, result){
      if (err){
        res.send(err);
      }else if ( result.length){
        res.render('userlist',{
          "userlist" : result
        });
      }else {
        res.send('No documents found');
      }
      //close db
      db.close();
    });
  }
});


router.get('/newuser', function(req , res){
res.render('/newuser', {title: 'add user'});
});


router.post('/adduser', function(req,res){
  //connect mongo server
  var MongoClient =mongodb.MongoClient;
  //define where mongo server is
  var url = 'mongodb://localhost: 27017/meow';

  //connect to the server
  MongoClient.db = connect(url, function(err,db){
    if (err){
      console.log("unable to connect to server :( ", err);
    }else {
      conosole.log('connected to server :D ');

      //get the doccument colletion
      var collection = db.collection('user');

      //get the user data passed from the form
      var user = { user: req.body.user,
        pass: req.body.pass,
        email: req.body.email
    };
    collection.insert([user],function(err, result){
      if (err){
        console.log(err);
      }else {
        //redirect updated user list
        res.redirect("thelist");
      }
      db.close();
    }); //maybe too many ) come back here in just in case

    }
  });

});
module.exports = router;
