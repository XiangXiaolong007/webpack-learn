// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV == 'development'
const config = require('./public/config')[isDev ? 'dev' : 'build']
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
    filename: 'bundle.[hash:6].js',
    publicPath: '/' // 通常是CDN地址
  },
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
      }, {
        /**
         * style-loader 动态创建style标签，将css插入到head中
         * css-loader 负责处理@import等语句
         * postcss-loader和autoprefixer，自动生成浏览器兼容性前缀
         * less-loader 负责处理编译.less文件，将其转为css
         */
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                require('autoprefixer')({
                  'overrideBrowserlist': [
                    '>0.25%',
                    'not dead'
                  ]
                })
              ]
            }
          }
        }, 'less-loader'],
        exclude: /node_modules/
      }, {
        /**
         * url-loader 和 file-loader的功能类似，但是url-loader可以指定在文件大小小于指定的限制时，返回DataURL
         */
        test: /\.(png|jpg|jpeg|gif|webp|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, // 10k
            esModule: false, // 设置为false，否则，<img src={reuqire('xxx.jpg')} />会出现<img src=[Module Object] />
            name: '[name]_[hash:6].[ext]',
            outputPath: './assets' // 将图片打包到一个文件夹下
          }
        }],
        exclude: /node_modules/
      }, 
      // 使用这个loader就不能使用ejs模板了
      // {
      //   test: /\.html$/,
      //   use: 'html-withimg-loader'
      // }
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
    }),
    // clean-webpack-plugin 都会帮我们先清空一波 dist 目录
    // 不需要传参，它可以找到outputPath
    new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] // 不删除dll目录下的文件
    })
  ],
  // 生产环境可以使用none或者source-map,使用souce-map最终会单独打包出一个.map文件，我们可以根据报错信息和此map文件，进行错误解析，定位到源代码
  devtool: 'cheap-module-eval-source-map', // 开发环境下使用
  devServer: {
    port: 8999, // 默认是8080
    quiet: false, // 默认不启用，启用之后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自webpack的错误或警告在控制台不可见。
    inline: false, // 默认开启inline模式，如果设置为false,开启iframe模式
    // stats: 'errors-only', // 终端仅打印error，注意当启用了 quiet 或者 noInfo时，此属性不起作用
    overlay: false, // 默认不启用，启用的话，当编译出错时，会在浏览器窗口全屏输出错误。
    clientLogLevel: 'silent', // 日志等级，当使用内联模式时，在浏览器的控制台将显示消息，如：在重新加载之前，在一个错误之前，或者模块热替换启用时。如果不喜欢这些信息，可以将其设置为silent
    compress: true // 是否启用gzip压缩
  }
}
