const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
    service: 'qq', //类型qq邮箱
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '', // 发送方的邮箱
        pass: 'xxxx' // smtp 的授权码
    }
});
//pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
//邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码

function sendMail(mail, option, call) {
    // 发送的配置项
    let mailOptions = {
        from: '"Creator-blog"', // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎来到"Creator-demo"', // 标题
        text: 'Hello world?', // 文本内容
        html: `<p>${option.user_name}给你留言了快去看看吧:</p><a href="http://106.52.111.158/article?articleId=${option.articleId}">点击跳转</a>`, //页面内容
    };

    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            call(false)
        } else {
            call(true) //因为是异步 所有需要回调函数通知成功结果
        }
    });

}

module.exports = {
    sendMail
}
