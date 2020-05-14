'use strict'
var mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	// 分类名称
	name: { type: String, required: true},

	// 分类描述
	desc: { type: String, default: '' },

	// 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Category', categorySchema);