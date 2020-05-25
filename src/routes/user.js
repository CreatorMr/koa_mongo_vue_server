const router = require('koa-router')()
const user_controller = require('../controllers/login_user.js')
router
.post('/login', user_controller.login)
.post('/register', user_controller.register)
.get('/info', user_controller.info)

module.exports = router;