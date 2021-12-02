module.exports = {
  publicPath: "./", // 基本路径
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:5000',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/tbk': {
        target: 'http://82.156.117.112:9191/',//服务器
        // target: 'http://127.0.0.1:9191/',//本地
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
    },



  }
}
