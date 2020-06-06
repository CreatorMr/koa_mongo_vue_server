const router = require('koa-router')()
const article = require('../controllers/article.js')
const tag = require('../controllers/tags.js')
const category = require('../controllers/category.js')
router.get('/article', article.getAll)
  .post('/create', article.createArticle)
  .get('/comment', article.getArticleComment)
  .post('/addComment', article.addArticleComment)
  .get('/getTags', tag.getTagsList)
  .post('/addTag', tag.addTag)
  .get('/categoryList', category.getCategoryList)
  .post('/addCategory',category.addCategory)
  .post('/updateArticle', article.updateArticle)
module.exports = router;