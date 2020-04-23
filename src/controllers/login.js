const jwt = require('jsonwebtoken')
const User = require('../models/user/index')
const user = new User()
// 登录
const login = function async () {
  const ctx = this;
  const opts = ctx.request.body;
  const token = jwt.sign(JSON.stringify({ name: opts.name, timestamp: Date.now()}), 'jwtToken-creator');
  let resDoc = await user.query(opts)
  const user = resDoc[0] || ''
  if (user) {
    ctx.body = {
      message: '登陆成功！',
      user: user,
      ok: true,
      token: token
    }
  } else {
    ctx.body = {
      msg: '用户名或密码错误',
      user: user,
      ok: false
    }
  }
}

// 注册
const register = function async () {
  const ctx = this;
  const opts = this.request.body;
  let resDoc = await user.query({username: opts.username})
  if (resDoc.length > 0) {
    ctx.body = {
      message: '该账户已存在',
      data: resDoc,
      ok: false
    }
 } else {
   await user.save(opts)
   ctx.body = {
    msg: '注册成功',
    data: resDoc,
    ok: true
  }
 }
}

module.exports = {
  register,
  login
}