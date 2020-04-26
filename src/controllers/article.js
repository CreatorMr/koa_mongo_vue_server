const Article = require('../models/article')
const article = new Article()

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

const getTagsList =async (ctx, next) =>{
  let result = []
  let res = await article.query({})
  if (doc) {
    for (let i in doc) {
      const tags = doc[i].tags
      if (result.indexOf(tags) === -1) {
        result.push(tags)
      }
    }
    ctx.body = {
      success: true,
      message: '获取标签成功',
      tagsList: result
    }
  }
}

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
  ctx.body = res
}

const getArticleComment = async (ctx, next) => {
  const query = ctx.request.query
  let res = await article.queryById(query)
  ctx.body = res.comments
}

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
  getTagsList,
  getAll,
  getArticleComment,
  addArticleComment
}