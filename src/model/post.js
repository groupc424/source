var mongoose = require('mongoose');

var postModel = mongoose.Schema({
  _id: String,
  imgPath: String,
  timeStamp: Date,
  poster: String,
  caption: String
});

var PostModel = mongoose.model('post',postModel);
module.exports = PostModel;
