const jwt = require('jsonwebtoken')
const User = require('../models/user/index')

const user = new User()
// 登录
const login =  async (ctx, next) =>{
  const opts = ctx.request.body;
  const token = jwt.sign(JSON.stringify({ name: opts.name, timestamp: Date.now()}), 'jwtToken-creator');
  console.log(token, 'token')
  let resDoc = await user.query(opts)
  const res = resDoc[0] || ''
  if (res) {
    ctx.body = {
      message: '登陆成功！',
      user: res,
      ok: true,
      token: token
    }
  } else {
    ctx.body = {
      msg: '用户名或密码错误',
      user: res,
      ok: false
    }
  }
}

// 注册
const register =  async (ctx, next) => {
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