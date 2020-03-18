<u>[原著参考链接](https://mp.weixin.qq.com/s/X9fWN4GbDFOLfOODZlLoVg)</u>
# webpack的介绍
## 1.webpack是什么
> webpack 是一个现代 JavaScript 应用程序的静态模块打包器，当 webpack 处理应用程序时，会递归构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。
## 2.webpack的核心概念
>+ entry: 入口
>+ output: 输出
>+ loader: 模块转换器，用于把模块原内容按照需求转换成新内容
>+ 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情
## 3.将JS转义为低版本
>+ 安装babel-loader => *npm install babel-loader -D*
>+ 配置babel，安装依赖 => *npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 -D*  
> **详细配置见代码**
## 4.mode
>+ mode配置项，告知webpack使用相应模式的内置优化 'development'
 || 'production'
## 5.在浏览器中查看页面
>+ npm install html-webpack-plugin -D **详细配置见代码**
>+ npm install webpack-dev-sever -D **devServer详细配置见代码**
## 6.devtool
**devtool中的一些设置，可以帮助我们将编译后的代码映射回原始源代码。不同的值会明显影响到构建和重新构建的速度。**
>+ 开发环境一般设置为'cheap-module-eval-source-map'
>+ source-map 和 hidden-source-map 都会打包生成单独的 .map 文件，区别在于，source-map 会在打包出的js文件中增加一个引用注释，以便开发工具知道在哪里可以找到它。hidden-source-map 则不会在打包的js中增加引用注释。
## 7.如何处理样式文件
**webpack 不能直接处理 css，需要借助 loader。如果是 .css，我们需要的 loader 通常有： style-loader、css-loader，考虑到兼容性问题，还需要 postcss-loader，而如果是 less 或者是 sass 的话，还需要 less-loader 和 sass-loader，这里配置一下 less 和 css 文件(sass 的话，使用 sass-loader即可)**
>+ 安装依赖(以less为例) => npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D **具体配置见代码**
>+ **注意：**  
>loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行，上面 loader 的执行顺序为: less-loader ---> postcss-loader ---> css-loader ---> style-loader  
当然，loader 其实还有一个参数，可以修改优先级，enforce 参数，其值可以为: pre(优先执行) 或 post (滞后执行)。
## 8.图片/字体文件处理
**我们可以使用 url-loader 或者 file-loader 来处理本地的资源文件。url-loader 和 file-loader 的功能类似，但是 url-loader 可以指定在文件大小小于指定的限制时，返回 DataURL，因此，个人会优先选择使用 url-loader**
>+ 安装依赖 => npm install url-loader -D  
> 注意这里会提示安装file-loader => npm install file-loader -D  
> **具体配置见代码**
## 9.处理html中的代码
>+ 安装依赖 => npm install html-withimg-loader -D  
**使用该插件则html中的 ejs 模板的写法会失效，可以删除该loader，在html中引入图片的写法改为`<img src="<%= require('./thor.jpeg') %>" />`即可**
## 10.入口配置
>+ **单个入口**  
> `entry: './src/index.js'`
>+ **多个入口**  
>> ```javascript
>> entry: [
>>    './src/index.js',
>>    './src/polyfill.js'
>>]
>>```
## 11.出口配置
>+ 详见代码中output配置
## 12.每次打包前清空dist目录
>+ 需要插件: clean-webpack-plugin  
> 可以通过参数 cleanOnceBeforeBuildPatterns 配置dist目录下某个文件夹不被清空