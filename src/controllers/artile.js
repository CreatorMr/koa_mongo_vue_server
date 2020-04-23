const Article = require('../models/article')
const article = new Article()

const createArticle = async () => {
  const ctx = this
  const opts = this.request.body
  let res = await article.save(opts)
  console.log(res)

}

const getTagsList =async (next) =>{
  const ctx = this
  const opts = this.request.body
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
module.exports = {
  createArticle,
  getTagsList,

}