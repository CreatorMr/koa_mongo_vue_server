const { Category }  = require('../models/article/index.js')
const category = new Category()
const getCategoryList =async (ctx, next) =>{
  let result = []
  let doc = await category.query({})
  ctx.body = {
    ok: true,
    message: '获取分类成功',
    cateList: doc
  }
}


module.exports = {
  getCategoryList
}