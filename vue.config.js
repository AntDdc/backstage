// const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    devServer: {
      host: '0.0.0.0',
      port: 3000,
        proxy:'http://127.0.0.1:8888',
        // proxy: {
        //     '/api/private/v1': {
        //         target: 'http://127.0.0.1:8888',  // 请求本地 需要xboot后台项目
        //         ws: false
        //     },
        //     '/api': {
        //         target: 'http://192.168.2.193:7777',
        //         ws: false
        //     },
        //     '/scratch-gui/': {
        //         target: 'http://192.168.2.242:8601', // 换成正确的服务器域名
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/scratch-gui/': ''
        //         }
        //     }
        // },
  },
  lintOnSave: true
}
