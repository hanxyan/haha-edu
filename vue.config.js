const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

let CUR_BASE_URL='/haha-edu';

module.exports = {
  outputDir: './dist',
  publicPath: process.env.NODE_ENV === 'production' ? CUR_BASE_URL+'/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      // .set('_c', resolve('src/components'))
  },
  css: {
    loaderOptions: {
      sass:{
        // data选项允许你在所有被处理的文件之间共享常见的变量，而不需要显示地导入它们
        data:`@import "@/assets/scss/variables.scss";@import "@/assets/scss/mixin.scss";@import "@/assets/scss/flex.scss";`
      },
      postcss:{
        plugins:[require('postcss-px-to-viewport')({
          viewportWidth: 1080,     // (Number) The width of the viewport.视窗的宽度，对应设计稿的宽度。一般是750
          viewportHeight: 2340,    // (Number) The height of the viewport.视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.指定px转换为视窗单位值的小数位数（很多时候无法整除）
          viewportUnit: 'vw',     // (String) Expected units.指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore', '.hairlines', 'van-circle__layer'],  // (Array) The selectors to ignore and leave as px.指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
          exclude: [/node_modules/],
          minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false       // (Boolean) Allow px to be converted in media queries.允许在媒体查询中转换`px`
        }),
        require('postcss-design-convert')({
          multiple: 2.88,
          units: ['vw'],
          selector: /^\.van-/
        })]
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { colors: true },
    proxy: {
      //匹配代理的url
      '/apit': {
        // 目标服务器地址
        target: 'https://www.easy-mock.com/mock/5d7f5fd9fab82468ca6debaf/ufish',
        // target: 'http://gxtest.linkageinfo.com/educloud',
        pathRewrite: {'^/apit' : '/'},
        changeOrigin: true
      }
    }
  }
}
