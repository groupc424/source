var mongoose = require('mongoose');

var userModel = mongoose.Schema({
  _id: String,
  email: String,
  password: String,
  name: String,
  bio: String
});

var UserModel = mongoose.model('user',userModel);
module.exports = UserModel;
