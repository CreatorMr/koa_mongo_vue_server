const ArticleModel = require('./schema.js');
const CategoryModel = require('./category.js')
const TagModel = require('./tag.js')
const CommentModel = require('./comment.js')

class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    return new ArticleModel(opts).save();
  }
  query (conditions = {}, fields= {} , options = {}) {
    return this.model.find(conditions, fields, options)
    // return this.model.find()
    .populate(
      [{ path: 'tags'},{ path: 'category' },{path: 'comments'}]
    )
    .exec()
  }
  queryById (id) {
    return this.model.findById(id)
    .populate(
      [{ path: 'tags'},{ path: 'category' },{path: 'comments'}]
    )
    .exec()
  }
  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
  updateComment(id, opts) {
    return this.model.findById(id).then( async (doc) =>{
      if (!doc) return fn(null, false);
      // 找到文章之后 根据  opts 创建评论 返回评论的objectid 
      let com = await new CommentModel(opts).save();
      let comments = doc.comments
      comments.push(com._id)
      return this.model.findByIdAndUpdate(id,  { comments }, {
        new: true,
      }) 
    })
  }

  update(id, opts) {
    return this.model.findById(id).then( async (doc) =>{
      if (!doc) return fn(null, false);
      return this.model.findByIdAndUpdate(id,  opts, {
        new: true,
      }) 
    })
  }

}


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
class Category {
  constructor() {
    this.model = CategoryModel
  }
  save(opts) {
    return new CategoryModel(opts).save();
  }
  query (opts) {
    return this.model.find(opts)
    .sort({ _id: -1 })
    .exec()
  }
}
module.exports = {
  Article,
  Tag,
  Category
}

