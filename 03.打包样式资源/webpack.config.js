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
      {
        // 匹配哪些文件:
        test: /\.css$/,
      },
    ],
  },
  // plugins配置
  plu