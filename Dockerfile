# 设置基础镜像
FROM nginx:alpine
# 定义作者
MAINTAINER duanjw <554343346@qq.com>
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
