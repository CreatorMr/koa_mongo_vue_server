const Koa = require('koa');
const static = require('koa-static')
const koa = require('koa-router')()
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser');

const cors = require('koa2-cors');

/**
 * koa-mount
 * koa-router 
 * 两个都是koa使用的路由的库
 */
const app = new Koa();
console.log()
const db = require('./src/config/db.js')()
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect success!')
});

var admin = require('./src/routes/admin.js')


app.use(bodyParser());

app.use(
  mount('/favicon.ico', function (ctx) {
      // koa比express做了更极致的response处理函数
      // 因为koa使用异步函数作为中间件的实现方式
      // 所以koa可以在等待所有中间件执行完毕之后再统一处理返回值，因此可以用赋值运算符
      ctx.status = 200;
  })
)

app.use(static(__dirname + '/src/public/'))
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
// app.use(mount('/admin/create', (ctx, next)=> {
//   console.log(ctx.query)
//   ctx.body = ctx.query
// }))
koa.use('/admin', admin.routes(), admin.allowedMethods());
app.use(koa.routes());
app.use(cors());
app.listen(3000);

