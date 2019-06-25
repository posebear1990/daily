#!/bin/bash

# 获取bash脚本所在目录
DIR=$(dirname `pwd`/$0)

# NICHIJOU_CONFIG 环境变量来保存vps的配置
if   [ $DAILY_CONFIG ]; 
then 
rsync -avz --delete $DIR/../public/ $DAILY_CONFIG
else 
echo   "please set vpsconf environment variables eg: DAILY_CONFIG=root@123.456.789.123:/var/www/html/"
fi
