
var mongoose = require('mongoose');

// 评论模型
const commentSchema = new mongoose.Schema({
	
	article_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // 评论所在的文章 id
	content: { type: String, required: true, validate: /\S+/ }, // content
	is_top: { type: Boolean, default: false }, // 是否置顶
	likes: { type: Number, default: 0 }, 	// 被赞数
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 用户 id
	state: { type: Number, default: 1 }, // 保留 ，正常 热门  垃圾  
	create_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);