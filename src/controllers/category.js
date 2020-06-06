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

const addCategory =async (ctx, next) =>{
  const opts = ctx.request.body
  let resDoc = await category.query({name: opts.name})
  if (resDoc.length > 0) {
    ctx.body = {
      message: '该分类已存在',
      data: resDoc,
      ok: false
    }
  } else {
    let doc = await category.save(opts)
    ctx.body = {
      ok: true,
      message: '添加分类成功',
      tagsList: doc
    }
  }
  
}


module.exports = {
  getCategoryList,
  addCategory
}