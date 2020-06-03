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

commit=$(git status | grep -e "nothing to commit, working tree clean" -e "nothing added to commit")

if [ ! "$commit" ]; 
then
 echo "本地还有未提交的代码，请先提交"
 exit;
fi

push=$(git status | grep -e "Your branch is up")
echo "$push"
if [ ! "$push" ]; then
 echo "本地还有未push的代码，请先push"
 exit;
fi

npm run build
# 登录服务器
expect -c "
  spawn rsync -raqpPLv build $1@$2:/data/app/koa_mongo_vue_server/
  expect {
          \"*assword\" {set timeout 100000;send \"$3\r\";}
          \"yes/no\" {send \"yes\r\"; exp_continue;}
  }

  interact"
  
echo "部署成功"
exit;
else 
 echo "缺少密码"
 exit;
fi