// 自动将px转化为rem   不能转换行内样式
module.exports = {
  plugins: {
    'autoprefixer': {
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}