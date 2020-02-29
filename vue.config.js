const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  lintOnSave:false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/': {
        ws: false,             //相关代理端不支持 ws
        target: 'https://www.v-uu.com',//生产
        // target: 'http://192.168.0.24:8081',//本地测试
        secure: false,
        changeOrigin: true
      },
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },

  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
};



