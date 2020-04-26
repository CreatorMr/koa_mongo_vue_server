
### 安装依赖
```
npm install

```


### Start Server
在启动服务之前 ，先确保数据库mongo已经运行，链接的库名blog 也可自行修改 mongodb://localhost:27017/blog
```
npm start
```

### Deploy with pm2
Use pm2 to deploy app on production enviroment.
```
pm2 startOrReload pm2.json
```
### 项目目录
使用tree 命令生成目录树
tree -C -L 2
```
.
├── README.md
├── app.js   入口
├── package-lock.json
├── package.json
├── pm2.json 
└── src
    ├── config   配置文件  -  链接数据库
    ├── controllers   接口api 统一管理
    ├── models       数据库操作  使用mongoose   操作和schema在统一目录下
    ├── public        
    ├── routes       路由文件统一管理
    └── utils        工具函数，第三方服务
```

### 使用的包 注释

koa-bodyparser 解析 post请求的发送的表单。需要在router之前被注册到app对象上
pm2-logrotate 监控／日志管理
"bcrypt"   加密用户密码（数据库没有存明文密码）
"koa-bodyparser": 解析前段请求参数    
"koa-router": // 路由
"koa2-cors": // 解决跨域
"mongoose":  // 操作 mongoDB 数据库
"uuid":// 生成唯一 id