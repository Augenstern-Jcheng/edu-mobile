module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 在.babelrc 中添加配置
  // 注意：webpack 1 无需设置 libraryDirectory
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }]
  ]
}
