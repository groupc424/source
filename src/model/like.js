var mongoose = require('mongoose');

var likeModel = mongoose.Schema({
  _id: String,
  postId: String,
  likedUserId: String,
  likedUserName: String
});

var Likes = mongoose.model('like',likeModel);
module.exports = Likes;