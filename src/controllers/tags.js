const Tag  = require('../models/article/index.js')
const tag = new Tag()
const getTagsList =async (ctx, next) =>{
  let result = []
  let doc = await tag.query({})
  console.log(doc, '--------------')
  ctx.body = {
    success: true,
    message: '获取标签成功',
    tagsList: doc
  }
}

module.exports = {
  getTagsList,
}