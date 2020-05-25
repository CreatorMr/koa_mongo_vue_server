'use strict'
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  nick_name:  { type: String, default: "长江7号" },
  avatar: String,
  status: { type: String, default: "normal" },
  createTime: { type: Date, default: Date.now },
  updateTIme: { type: Date, default: Date.now }
});
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model('User', userSchema);
