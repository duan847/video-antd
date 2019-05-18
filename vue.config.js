// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://video.chenyan7.com',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    //false：不输出map文件，代码压缩加密，运行时报错，错误信息无法准确得知是哪里的代码报错。
    productionSourceMap:false,

    configureWebpack: {
        externals: {
            "vue":"Vue",
            "vue-router":"VueRouter",
            "axios":"axios",
            "video": "video.js"
        }
    }
}
