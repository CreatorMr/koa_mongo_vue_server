const ArticleModel = require('./schema.js')


class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    return new ArticleModel(opts).save();
  }
  query (opts) {
    return this.model.find(opts)
    .sort({ _id: -1 })
    .exec()
  }
  queryById (id) {
    console.log(id)
    return this.model.findById(id)
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
