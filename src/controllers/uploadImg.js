const fs = require('fs')

const uploadImg = async (ctx, next) => {
  let file = ctx.request.files; // 获取上传文件
   // 创建可读流
   const reader = fs.createReadStream(file['image']['path']);
   console.log(__dirname, '__dirname')
   let filePath = `./src/public/img` + `/${file['image']['name']}`;
   let remoteFilePath = `http://localhost:3000/img` + `/${file['image']['name']}`;
   // 创建可写流
   console.log(filePath, 'filePath')
   const upStream = fs.createWriteStream(filePath);
   // 可读流通过管道写入可写流
   reader.pipe(upStream);
   return ctx.body = {
       url: remoteFilePath,
       message: "文件上传成功",
       cc: 0
   } 
}
module.exports = {
  uploadImg,
}