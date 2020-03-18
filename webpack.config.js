// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV == 'development'
const config = require('./public/config')[isDev ? 'dev': 'build']

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        // 直接在webpack里面配置babel，不用在babelrc里面配置了
        // use: {
        //     loader: "babel-loader",
        //     options: {
        //         presets: ["@babel/preset-env"],
        //         plugins: [
        //             [
        //                 "@babel/plugin-transform-runtime",
        //                 {
        //                     "corejs": 3
        //                 }
        //             ]
        //         ]
        //     }
        // },
        exclude: /node_modules/ // 排除node_modules目录
      }
    ]
  },
  plugins: [
    // 数组形式  放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false // 是否折叠空白
      },
      config: config.template
      // hash: true, // 是否加上hash，默认是false
    })
  ],
  devServer: {
      port: '3000', // 默认是8080
      quiet: false, // 默认不启用，启用之后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自webpack的错误或警告在控制台不可见。
      inline: false, // 默认开启inline模式，如果设置为false,开启iframe模式
      stats: 'error-only', // 终端仅打印error，注意当启用了 quiet 或者 noInfo时，此属性不起作用
      overlay: false, // 默认不启用，启用的话，当编译出错时，会在浏览器窗口全屏输出错误。
      clientLogLevel: 'silent', // 日志等级，当使用内联模式时，在浏览器的控制台将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换启用时。如果不喜欢这些信息，可以将其设置为silent
      compress: true // 是否启用gzip压缩
  }
}
