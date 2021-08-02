/*
webpack.config.js ----  webpack的配置文件

	作用:指示webpack干哪些活(当你运行webpack时,会加载里面的配置)

	所有构建工具都是基于nodejs平台运行的,模块化默认采用commonjs
*/
// 用来拼接绝对路径的方法
const { resolve } = require("path")

module.exports = {
  // webpack配置
  // 入口起点
  entry: "./src/index.js",
  // 输出
  output: {
    filename: "main.js",
    // __dirname  nodejs的变量,代表当前文件(webpack.config,js)的目录绝对路径(03.打包样式资源)
    path: resolve(__dirname, "build"),
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件脾虚配置不同的loader处理
      {
        // 匹配哪些文件:
        test: /\.css$/,
        use: [
          // use数组中loader执行顺序,从右往左,从下到上
          // 创建style标签,将js中的样式资源进行插入,添加到head中生效.
          "style-loader",
          // 将css文件变成commonjs模块加载到js中,里面内容是样式字符串
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件
          "less-loader",
        ],
      },
    ],
  },
  // plugins配置
  plugins: [],
  //模式
  mode: "development",
  // mode: "production",
}
