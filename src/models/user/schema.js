'use strict'
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userId: String,
  username:  String,
  nickname:  String,
  password: String,
  email: String,
  headerImg: String,
  age: Number,
  phone: String,
  createTime: { type: Date, default: Date.now },
  updateTIme: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
