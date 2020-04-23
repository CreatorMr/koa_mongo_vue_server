const Koa = require('koa');
const static = require('koa-static')
const app = new Koa();
console.log()
const db = require('./src/config/db.js')()
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect success!')
});





app.use(static(__dirname + '/src/public/'))
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

