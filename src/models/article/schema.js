'use strict'
var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title:  String,
  tags: String,
  category: String,
  author: String,
  body:   String,
  comments: [{ content: String, date: { type: Date, default: Date.now }, comName: { type: String, default: '大牛'} }],
  hidden: Boolean,
  createTime: { type: Date, default: Date.now },
  updateTIme: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
