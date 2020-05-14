const ArticleModel = require('./schema.js');
const Tag = require('./tag.js');


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
    .sort({ _id: -1 })
    .exec()
  }
  queryById (id) {
    return this.model.findById(id)
    .populate(
      { path: 'tags', model: Tag }
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
