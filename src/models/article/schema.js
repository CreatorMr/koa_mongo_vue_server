'use strict'
var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
  title:  { type: String, required: true, validate: /\S+/ }, // 文章标题
	keyword: [{ type: String, default: '' }], // 文章关键字（SEO）
  author: { type: String, required: true, validate: /\S+/ },
  
  desc: { type: String, default: '' }, // 文章描述
	content: { type: String, required: true, validate: /\S+/ }, // 文章内容
	postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	img_url: { type: String, default: '' },// 封面图
	state: { type: Number, default: 1 }, // 文章发布状态 => 0 草稿，1 已发布
	origin: { type: Number, default: 0 }, // 文章转载状态 => 0 原创，1 转载，2 混合
	// tags: { type: Array, ref: 'Tag', required: true }, // 文章标签
  // comments: { type: Array, ref: 'Comment', required: false },
  // category: { type: Array, ref: 'Category', required: true }, // 文章分类
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // 文章标签
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}], // 文章分类
	like_users: [ // 点赞的用户
		{
			// 用户id
			id: { type: mongoose.Schema.Types.ObjectId },
			// 名字
			name: { type: String, required: true, default: '' },
			// 头像
			avatar: { type: String, default: 'user' },
			// 创建日期
			create_time: { type: Date, default: Date.now },
		},
	],
	// 其他元信息
	meta: {
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		comments: { type: Number, default: 0 },
	},
  createTime: { type: Date, default: Date.now },
  updateTIme: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);