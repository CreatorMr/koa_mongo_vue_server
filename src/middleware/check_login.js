const jwt = require('jsonwebtoken')

// 需要验证
const blackList = [
  '/loginUser/info',
  '/admin/addComment'
]

module.exports = function () {
  return async function (ctx, next) {
    if (blackList.indexOf(ctx.path) != -1) {
      // 需要验证
      console.log(ctx.path, '登录验证')
      const token = ctx.cookies.get('jwtToken-creator') || ''
      if (token) {
        let payload
        try {
          payload = jwt.verify(token, 'jwtToken-creator')
        } catch (error) {
          ctx.body = {
            msg: 'token无效',
            user: {},
            ok: false
          }
          return;
        }
        //TODO  token 的时效性验证 

        // 解析token 拿_id
        // let t = global.db.collection("users").find({})
        let resDoc = await global.dbUser.findById({_id:payload._id});
        if (resDoc) {
          await next();
        } else {
          ctx.body = {
            msg: '登录失效',
            user: resDoc,
            ok: false
          }
          return;
        }
      } else {
        ctx.body = {
          msg: '登录失效',
          user: {},
          ok: false
        }
        return;
      }
    } else {
      // 处理
      await next();
    }
  }
}