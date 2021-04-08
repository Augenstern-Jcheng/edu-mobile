// 优化打包配置
module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: {
    // 通过 CDN 引入
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  },
  // 图片压缩 loader 配置
  chainWebpack: config => {
    // 配置图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  }
}
