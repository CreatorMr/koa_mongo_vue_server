const { Article } = require('../models/article')
const category = require('../models/article/category')
const article = new Article()
const { sendMail } = require('../utils/sendEmail.js')
const fs = require('fs')
const path = require('path')
// 创建文章
const createArticle = async (ctx, next) => {
  const opts = ctx.request.body
  let res = await article.save(opts)
  ctx.body = {
    ok: true,
    message: '创建成功',
    artList: res
  }
}


// 获取所有文章
const getAll = async (ctx, next) => {
  // const param = ctx.request.query.param
  // const query = typeof param === 'string' ? JSON.parse(param) : param
  const query = ctx.request.query

  const pageNum = query && query.pageNum,
        pageSize = query && query.pageSize || 20,
        articleId = query && query.articleId,
        tag_id = query && query.tag_id,
        category_id = query && query.category_id,
        keyword = query && query.keyword || null,
        state = query && query.state;
  const token = ctx.request.headers.token || '';

 

  const fields = {
    title: 1,
    author: 1,
    keyword: 1,
    desc: 1,
    img_url: 1,
    tags: 1,
    category: 1,
    comments: 1,
    like_users: 1,
    meta: 1,
    createTime: 1,
    updateTime: 1,
  };
  let conditions = {};
  let options = {};
  let skip =0 ;
  if (keyword) {
    const reg = new RegExp(keyword, 'i');
    conditions = {
      $and: [
        { $or: [{ state: state }] },
        {
          $or: [
            { title: { $regex: reg } },
            { desc: { $regex: reg } }
          ],
        }
      ],
    };
  }
  if(pageNum){
    skip = pageNum - 1 < 0 ? 0 : (pageNum - 1) * pageSize;
  }
  options = {
    skip,
    limit: pageSize - 0,//,
    sort: { createTime: -1 }
  }
  let res
  let count = 0
  if(articleId) {
    res = await article.queryById({_id:articleId})
  } else {
    if(tag_id) {
      conditions =  { ...conditions, tags: {_id: tag_id}}
    }
    if(category_id) {
      conditions =  { ...conditions, category: {_id: category_id}}

    }
    count = await article.query(conditions, fields, {  sort: { createTime: -1 } })
    res = await article.query(conditions, fields, options)
  }
  ctx.body = {
    data: res,
    count: count.length
  }
}

// 获取文章的评论
const getArticleComment = async (ctx, next) => {
  const query = ctx.request.query
  let res = await article.queryById(query)
  ctx.body = res.comments
}
const updateArticle = async (ctx, next) => {
  const opts = ctx.request.body
  const id = {
    _id : opts.article_id
  }
  // 需要文章的_id 评论的内容
  let res = await article.update(id, opts)
  ctx.body = {
    ok: true,
    message: '更新成功',
    artList: res
  }
}
// 添加评论
const addArticleComment = async (ctx, next) => {
  const opts = ctx.request.body
  const id = {
    _id : opts.article_id
  }
  // todo required 字段 为空校验 return error
  if(!opts.content) {
    ctx.body = {
      ok: false,
      message: '内容不能空',
      artList: []
    }
    return
  }
  // 需要文章的_id 评论的内容
  let res = await article.updateComment(id, opts)
  // 留言发送邮件  功能已经完成， 后续有评论回复功能的时候 在启动  
  // 暂时只给自己发邮件查看留言 opts.email 替换成自己的邮箱
  // sendMail(opts.email, {article_id: opts.article_id, user_name: opts.user_name})
  console.log(res.comments, 'res')
  ctx.body = {
    ok: true,
    message: '创建成功',
    artList: res
  }
}

module.exports = {
  createArticle,
  getAll,
  getArticleComment,
  addArticleComment,
  updateArticle
}