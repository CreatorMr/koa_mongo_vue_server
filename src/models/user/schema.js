'use strict'
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user_id: String,
  user_name:  String,
  nick_name:  String,
  password: String,
  email: String,
  avatar: String,
  age: Number,
  phone: String,
  createTime: { type: Date, default: Date.now },
  updateTIme: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
