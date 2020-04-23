// const MongoClient = require('mongodb').MongoClient
// const url = "mongodb://localhost:27017/"

// module.exports = function() {
//   MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     dbo.collection("site").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
//   });
// }

const mongoose = require('mongoose')
module.exports = function() {
  mongoose.connect("mongodb://localhost:27017/blog")
  return mongoose.connection
}

