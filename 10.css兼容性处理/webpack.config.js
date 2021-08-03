const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 1.引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/main.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 3.替换style-loader
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 2.使用插件
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
}
