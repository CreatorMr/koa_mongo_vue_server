const Article = require('../models/article')
const article = new Article()

// 创建文章
const createArticle = async (ctx, next) => {
  const opts = ctx.request.body
  console.log(opts, '入参')
  let res = await article.save(opts)
  console.log(res)
  ctx.body = {
    success: true,
    message: '创建成功',
    artList: res
  }
}


// 获取所有文章
const getAll = async (ctx, next) => {
  const query = ctx.request.query
  const limit = query && query.limit,
        start = query && query.start;
  const token = ctx.request.headers.token || '';
  let res 
  if(JSON.stringify(query) === '{}') {
    res = await article.query({})
  } else {
    res = await article.queryById(query)
  }
  console.log(1111)
  ctx.body = {
    data: res,
    count: res.length
  }
}

// 获取文章的评论
const getArticleComment = async (ctx, next) => {
  const query = ctx.request.query
  let res = await article.queryById(query)
  ctx.body = res.comments
}

// 添加评论
const addArticleComment = async (ctx, next) => {
  const opts = ctx.request.body
  const id = {
    _id : opts._id
  }
  // 需要文章的_id 评论的内容
  let res = await article.update(id, opts)
  console.log(res)
  ctx.body = {
    success: true,
    message: '创建成功',
    artList: res
  }
}


module.exports = {
  createArticle,
  getAll,
  getArticleComment,
  addArticleComment
}