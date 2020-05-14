const router = require('koa-router')()
const article = require('../controllers/article.js')

router.get('/article', article.getAll)
  .post('/create', article.createArticle)
  .get('/comment', article.getArticleComment)
  .post('/addComment', article.addArticleComment)
  .post('/getTags', article.getTagsList)

module.exports = router;
