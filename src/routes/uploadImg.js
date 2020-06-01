const router = require('koa-router')()
const upload = require('../controllers/uploadImg.js')
const koaBody = require('koa-body')
router.post('/uploadImg', koaBody({ // 解析文件上传
  multipart: true,
  formidable: {
      maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}), upload.uploadImg)
module.exports = router;
