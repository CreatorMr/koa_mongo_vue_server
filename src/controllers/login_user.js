const jwt = require('jsonwebtoken')
const User = require('../models/user/index')

const user = new User()

// 获取用户信息
const info =  async (ctx, next) =>{
  // const opts = ctx.request.body;
  const token = ctx.cookies.get('jwtToken-creator') || ''
  if(token) {
    const payload = jwt.verify(token,'jwtToken-creator')
    // 解析token 拿_id
    let resDoc = await user.queryById({_id: payload._id})
    if (resDoc) {
      ctx.body = {
        message: '获取信息成功',
        user: resDoc,
        ok: true,
        token: token
      }
    } else {
      ctx.body = {
        msg: '登录失效',
        user: resDoc,
        ok: false
      }
    }
  } else {
    ctx.body = {
      msg: '登录失效',
      user: {},
      ok: false
    }
  }
  
}
// 登录
const login =  async (ctx, next) =>{
  // 邮箱密码 登录成功返回token
  const opts = ctx.request.body;
  console.log(opts, 'opts')
  let resDoc = await user.query(opts)
  const res = resDoc[0] || ''
  if (res) {
    const token = jwt.sign(JSON.stringify(resDoc[0]), 'jwtToken-creator');
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
  const opts = ctx.request.body;
  let resDoc = await user.query({email: opts.email})
  if (resDoc.length > 0) {
    ctx.body = {
      message: '该账户已存在',
      data: resDoc,
      ok: false
    }
 } else {
   let t = await user.save(opts)
   console.log(t, 'tetet')
   ctx.body = {
    msg: '注册成功',
    data: resDoc,
    ok: true
  }
 }
}

module.exports = {
  register,
  login,
  info
}