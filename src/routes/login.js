const router = require('koa-router')()
const user_controller = require('../controllers/login.js')
router
.post('/login', user_controller.login)
.get('/register', user_controller.register)

module.exports = router;