  
const Koa = require('koa');
const static = require('koa-static')
const koa = require('koa-router')()
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser');

const cors = require('koa2-cors');
const cookie = require('koa-cookie')
const koaBody = require('koa-body'); //解析上传文件的插件
/**
 * koa-mount
 * koa-router 
 * 两个都是koa使用的路由的库
 */
const app = new Koa();

const db = require('./src/config/db.js')()
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect success!')
});

// 引入路由文件
const admin = require('./src/routes/admin.js')
const loginUser = require('./src/routes/user.js')
const uploadImg = require('./src/routes/uploadImg.js')

app.use(bodyParser());
app.use(cookie.default());

app.use(
  mount('/favicon.ico', function (ctx) {
      // koa比express做了更极致的response处理函数
      // 因为koa使用异步函数作为中间件的实现方式
      // 所以koa可以在等待所有中间件执行完毕之后再统一处理返回值，因此可以用赋值运算符
      ctx.status = 200;
  })
)
// 处理静态文件
app.use(static(__dirname + '/src/public/'))

// request-test

// app.use(mount('/', (ctx, next)=> {
//   console.log(ctx.query)
//   ctx.body = "服务端已经启动"
// }))

koa.use('/admin', admin.routes(), admin.allowedMethods());
koa.use('/loginUser', loginUser.routes(), loginUser.allowedMethods());
koa.use('/uploadImg', uploadImg.routes(), uploadImg.allowedMethods());
app.use(koa.routes());

app.use(cors());
app.listen(3000);

