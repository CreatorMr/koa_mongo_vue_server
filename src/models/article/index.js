const ArticleModel = require('./schema.js')


class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    return new ArticleModel(opts).save();
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
}

module.exports = Article
