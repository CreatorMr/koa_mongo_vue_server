// router.post('/email', async (ctx, next) => {
//   const mail = ctx.request.body.email
//   const code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
//   check[mail] = code
//   if (!mail) {
//       return ctx.body = '参数错误' //email出错时或者为空时
//   }
//   async function timeout() {
//       return new Promise((resolve, reject) => {
//           email.sendMail(mail, code, (state) => {
//               resolve(state);
//           })
//       })
//   }
//   await timeout().then(state => {
//       if (state) {
//           return ctx.body = "发送成功"
//       } else {
//           return ctx.body = "失败"
//       }
//   })
// })