var mongoose = require('mongoose');

var myuserSchema = new mongoose.Schema({
  "userId":Number,
  "userName":String,
  "userPwd":String,
});

module.exports = mongoose.model("myUsers",myuserSchema);
