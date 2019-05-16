# vue-antd

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Run your tests
```
pnpm run test
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### deplay
1. 复制nginx文件夹到服务器根目录
2. 复制Dockerfile文件到服务器根目录
3. 复制dist文件夹到服务器根目录
4. 执行docker编译、运行命令：
```
docker build -t video-vue .
docker run -d -p 80:80 --name video-vue video-vue
```
