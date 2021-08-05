const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  /**
   * entry:入口起点
   * 1.单入口-string
   * 打包成一个chunk,输出一个bundle
   * 2.多入口-array
   * 所有入口文件最终只会形成一个chunk,输出出去一个bundle
   * 作用:只有在HMR功能中让html热更新生效
   * 3.多入口-object
   * 有几个入口文件就形成几个chunk,输出几个bundle
   * chunk的名称为key
   *
   * --->特殊用法:
   * {
   * 	这里形成一个chunk,输出一个bundle
   * 	index: ["./src/index.js","./src/add.js"],
   * 	这里形成一个chunk,输出一个bundle
   *  count: "./src/count.js"
   * }
   */
  // entry: "./src/index.js",
  // entry: ["./src/index.js", "./src/add.js", "./src/count.js"],
  entry: { index: "./src/index.js", add: "./src/add.js", count: "./src/count.js" },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
}
