var express = require('express');
var multer = require('multer');
var uuid = require('uuid');
var mongoose = require('mongoose');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);

var UserModel = require('../model/user');
var Posts = require('../model/post');
var Comments = require('../model/comment');
var Likes = require('../model/like');

//get router instance
var router = express.Router();

//base path for uploads
var UPLOAD_FILE_PATH = './uploads';

//configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FILE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v1());
  }
});

var upload = multer({ storage: storage }).single('postImage');

// login
router.post('/login',function (req,res,next) {
  var id = new Buffer(req.body.email).toString('base64');
  UserModel.findById(id,'_id password',function (err,doc) {
    if(err){
      res.status(403).json({error:'invalid login data'});
    }else{
      if(doc && doc.password == req.body.password){
        res.json({userId: doc._id});
      }else{
        res.status(403).json({error:'invalid login data'});
      }
    }
  });
});

// signup
router.post('/signup', function(req,res,next) {
  var payload = req.body;
  var id = new Buffer(payload.email).toString('base64');
  payload._id = id;
  UserModel.create(payload, function(err, user){
    if(err){
      console.error('Error saving user');
      // console.log(err);
      res.status(500).json({error:'failed to save user'});
    }else{
      res.send();
    }
  });
});

// create a post
router.post('/:userId/post', function (req, res, next) {

  upload(req, res, function (err){
    if(err){
      console.log(err);
      res.status(500).json({error:'Failed to upload file'});
    }

    var postId = req.file.filename;
    var post = {
      _id: postId,
      imgPath: UPLOAD_FILE_PATH+'/'+req.file.filename,
      timeStamp: Date.now(),
      poster: req.params.userId,
      caption: req.body.caption
    };
    Posts.create(post, function (err, posting) {
      if(err){
        res.status(500).json({error: 'failed to save post data'});
      }
    });
    res.status(201).json({file: UPLOAD_FILE_PATH+'/'+req.file.filename});
  });
});

// get posts by the user
router.get('/:userId/post', function(req, res, next){

  Promise.props({
    comments: Comments.find().execAsync(),
    likes: Likes.find().execAsync(),
    posts: Posts.find({poster: req.params.userId}).execAsync()
  })
  .then(function(results){
    var comments = results.comments;
    var likes = results.likes;
    var posts = results.posts;
    var postsWithRections = [];

    for(var i=0; i<posts.length; i++){
      var post = posts[i];

      var postWithReactions = {
        _id: post._id,
        imgPath: post.imgPath,
        timeStamp: post.timeStamp,
        poster: post.poster,
        caption: post.caption,
        comments: [],
        likes: []
      };

      likes.forEach(function(like, lIndex){
        if(like.postId == post._id){
          postWithReactions.likes.push(like);
        }
      });

      comments.forEach(function(comment, cIndex){
        if(comment.postId == post._id){
          // console.log(post._id);
          // console.log(comment);
          postWithReactions.comments.push(comment);
        }
      });
      postsWithRections.push(postWithReactions);
      postWithRections = {};
    }

    res.status(200).json(postsWithRections);

    
  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({error: 'failed to fetch posts'});
  });

  // Posts.find({poster: req.params.userId}, function(err, docs){
  //   if(err){
  //     res.status(500).json({error: 'failed to fetch posts'});
  //   }
    
  //   res.status(200).json(docs);
  // });
});

module.exports = router;
