#!/bin/bash
echo "开始部署!"

user=$1
host=$2
pwd=$3

# -e 开启转义 -c 不换行
# echo "It is a test" > myfile

for i in "$*"; do
    echo "参数列表 $i"
done

:<<EOF
1、spawn：启动命令
2、expect：等待来自进程的特定的字符串
3、send：发送字符串到进程
4、interact：允许用户交互
EOF

if [ -n "$3" ]; then

# if [ ! -e "node_modules" ]; then
#   npm install -P
# else
#   npm install
# fi

# 判断本地状态
git status

# 登录服务器
expect -c "
  spawn ssh -p 22 $1@$2
  expect {
    \"yes/no\" { send \"yes\r\"; exp_continue }
    \"assword\" { send \"$3\r\" }
  }
  set timeout 5000;

  expect \"*]\#*\" { send \"cd /data/app/koa_mongo_vue_server/\r\" }
  
  expect \"*]\#*\" { send \"git status\r\" }

  expect \"*]\#*\" { send \"git pull\r\" }

  interact"
else 
 echo "缺少密码"
fi
