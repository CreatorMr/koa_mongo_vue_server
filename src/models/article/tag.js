'use strict'
var mongoose = require('mongoose');
// 标签模型
const tagSchema = new mongoose.Schema({
	// 标签名称
	name: { type: String, required: true, validate: /\S+/ },
	desc: String, // 标签描述
	icon: String,
	create_time: { type: Date, default: Date.now },	// 图标
});
module.exports = mongoose.model('Tag', tagSchema);
