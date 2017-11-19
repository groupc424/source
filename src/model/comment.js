var mongoose = require('mongoose');



var commentModel = mongoose.Schema({
  _id: String,
  postId: String,
  commenterId: String,
  commenterName: String,
  comment: String,
  commentDate: Date
});

var Comments = mongoose.model('comment',commentModel);
module.exports = Comments;
