const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/main.js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // 生产模式自动压缩js代码
  mode: "production",
}
