const router = require('koa-router')()
const article = require('../controllers/article.js')
const tag = require('../controllers/tags.js')

router.get('/article', article.getAll)
  .post('/create', article.createArticle)
  .get('/comment', article.getArticleComment)
  .post('/addComment', article.addArticleComment)
  .post('/getTags', tag.getTagsList)

module.exports = router;
