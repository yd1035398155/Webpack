const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",

  output: {
    // 文件名称(指定名称+目录)
    filename: "js/[name].js",
    // 输出文件目录(将来所有资源输出的公共目录)
    path: resolve(__dirname, "build"),
    // 所有资源引入公共路径前缀 --> 'img/a.jpg'   -->  '/img/a.jpg'
    // publicPath: "/",
    // 非入口chunk的名称(单独分割chunk时用)
    chunkFilename: "js/[name]_chunk.js",
    // 向整个库暴露的变量名
    // library: "[name]",
    // 变量名添加到 哪里(window(browser)|global(node)|commonjs)
    // libraryTarget: "window",
    //
  },

  plugins: [new HtmlWebpackPlugin()],

  mode: "development",
}
