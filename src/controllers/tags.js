const { Tag }  = require('../models/article/index.js')
const tag = new Tag()
const getTagsList =async (ctx, next) =>{
  let result = []
  let doc = await tag.query({})
  ctx.body = {
    ok: true,
    message: '获取标签成功',
    tagsList: doc
  }
}

const addTag =async (ctx, next) =>{
  const opts = ctx.request.body
  let resDoc = await tag.query({name: opts.name})
  if (resDoc.length > 0) {
    ctx.body = {
      message: '该标签已存在',
      data: resDoc,
      ok: false
    }
  } else {
    let doc = await tag.save(opts)
    ctx.body = {
      ok: true,
      message: '添加标签成功',
      tagsList: doc
    }
  }
  
}

module.exports = {
  getTagsList,
  addTag
}