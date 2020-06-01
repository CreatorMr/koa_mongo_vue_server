const fs = require('fs')

const uploadImg = async (ctx, next) => {
  let file = ctx.request.files; // 获取上传文件
   // 创建可读流
   const reader = fs.createReadStream(file['image']['path']);
   console.log(__dirname, '__dirname')
   debugger
   let filePath = `./src/public/img` + `/${file['image']['name']}`;
   console.log(process.env, 'process.env')
   let remoteFilePath
   if(process.env.NODE_ENV === 'development') {
    remoteFilePath = `http://localhost:3000/img` + `/${file['image']['name']}`; //
   } else {
    remoteFilePath = `http://106.53.236.144:3000/img` + `/${file['image']['name']}`;
   }
   // 创建可写流
   console.log(filePath, 'filePath')
   const upStream = fs.createWriteStream(filePath);
   // 可读流通过管道写入可写流
   reader.pipe(upStream);
   return ctx.body = {
       url: remoteFilePath,
       message: "文件上传成功",
       ok: true
   } 
}
module.exports = {
  uploadImg,
}