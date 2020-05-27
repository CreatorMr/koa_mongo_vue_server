const { Article } = require('../models/article')
const category = require('../models/article/category')
const article = new Article()
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
            { desc: { $regex: reg } },
            { keyword: { $regex: reg } },
          ],
        },
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
  if(articleId) {
    res = await article.queryById({_id:articleId})
  } else {
    res = await article.query(conditions, fields, options)
    if(tag_id) {
      res = res.filter(docs => docs.tags.find(x=>{
       return  x._id == tag_id
      } ))
    }
    if(category_id) {
      res = res.filter(docs => docs.category.find(x=>x._id == category_id ))
    }
  }
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
  
  // 需要文章的_id 评论的内容
  let res = await article.updateComment(id, opts)
  console.log(res.comments, 'res')
  ctx.body = {
    ok: true,
    message: '创建成功',
    artList: res
  }
}

const uploadImg = async (ctx, next) => {
  let file = ctx.request.files; // 获取上传文件
   // 创建可读流
   const reader = fs.createReadStream(file['image']['path']);
   let filePath = `./src/public/img` + `/${file['image']['name']}`;
   let remoteFilePath = `http://localhost:3000/img/my_blog_img` + `/${file['image']['name']}`;
   // 创建可写流
   const upStream = fs.createWriteStream(filePath);
   // 可读流通过管道写入可写流
   reader.pipe(upStream);
   return ctx.body = {
       url: remoteFilePath,
       message: "文件上传成功",
       cc: 0
   } 
}

module.exports = {
  createArticle,
  getAll,
  getArticleComment,
  addArticleComment,
  uploadImg,
  updateArticle
}