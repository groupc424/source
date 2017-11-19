var express = require('express');
var uuid = require('uuid');
var Promise = require('bluebird');
var mongoose = require('mongoose');

Promise.promisifyAll(mongoose);

var Posts = require('../model/post');
var Users = require('../model/user');
var Comments = require('../model/comment');
var Likes = require('../model/like');

var router = express.Router();


// get all posts
router.get('/', function(req,res){

  Promise.props({
    comments: Comments.find().execAsync(),
    likes: Likes.find().execAsync(),
    posts: Posts.find().execAsync()
  })
  .then(function(results){
    var comments = results.comments;
    var likes = results.likes;
    var posts = results.posts;
    var postsWithRections = [];

    for(var i=0; i<posts.length; i++){
      var post = posts[i];

      var postWithReactions = {
        id: post._id,
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
    res.status(500).json({error: err});
  });
});

//like a post
router.post('/:postId/like', function(req,res,next){
  var failed = false;
  var postId = req.params.postId;
  var userId = req.body.userId;
  var userName = '';

  Users.findById(userId,'name', function(err, doc){
    if(err){
      failed = true;
    }else{
      userName = doc.name;

      var like = {
        _id: uuid.v1(),
        postId: postId,
        likedUserId: userId,
        likedUserName: userName
      };
  
      Likes.create(like, function(err, likeDoc){
        if(err){
          failed = true;
        }else{
          res.status(200).json(likeDoc);
        }
      });
    }
  });

  if(failed){
    res.status(500).json({error: 'failed to add like'});
  }

});

// comment a post
router.post('/:postId/comment', function(req, res, next) {
  var postId = req.params.postId;
  var userId = req.body.userId;
  var failed = false;

  Users.findById(userId,'name', function(err, userDoc){
    if(err){
      failed = true;
    }else{
      var comment = {
        _id: uuid.v1(),
        postId: postId,
        commenterId: userId,
        commenterName: userDoc.name,
        comment: req.body.comment,
        commentDate: Date.now()
      };

      Comments.create(comment, function(err, commentDoc){
        if(err){
          failed = true;
        }else{
          res.status(200).json(commentDoc);
        }
      });
    }
  });

  if(failed){
    res.status(500).json({error: 'failed to add comment'});
  }
});

function getPosts(req,res,next){
  Posts.find(function (err, docs) {

    if(err){
      next(new Error("couldn't load posts \n"+err));
      return;
    }

    req.docs = docs;
    next();
  });
}

function getComments(req,res,next){
  var docs = req.docs;
  docs.forEach(function(doc, index){
    Comments.find({postId: doc._id},function(err, comments){
      if(!err){
        console.log(comments);
        docs[index].comments = comments;
      }else{
        console.log(err);
        docs[index].comments = [];
      }
      fetchedComments = true;
    });
  });

  console.log('----------------------------');
  req.docs = docs;
  next();
}


module.exports = router;