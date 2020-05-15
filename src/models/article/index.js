const ArticleModel = require('./schema.js');
const CategoryModel = require('./category.js')
const TagModel = require('./tag.js')
const CommentModel = require('./comment.js')

class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    console.log(opts, '0000')
    return new ArticleModel(opts).save();
  }
  query (opts) {
    return this.model.find(opts)
    .populate(
      [{ path: 'tags'},{ path: 'category' },{path: 'comments'}]
    )
    .sort({ _id: -1 })
    .exec()
  }
  queryById (id) {
    return this.model.findById(id)
    .populate(
      { path: 'tags' }
    )

  }
  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
  update(id, opts) {
    let comments = [{
      ...opts
    }]
    return this.model.findByIdAndUpdate(id,  { author: 'jason bourne', comments }, {
      new: true,
      // select: {} // 设置返回字段
    })
  }
}

module.exports = Article


class Tag {
  constructor() {
    this.model = TagModel
  }
  save(opts) {
    return new TagModel(opts).save();
  }
  query (opts) {
    return this.model.find(opts)
    .sort({ _id: -1 })
    .exec()
  }
}

module.exports = Tag

