/**
 * 开发环境配置
 */

const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/main.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 处理html中的img
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(gif|png|jpg)/,
        type: "asset",
        parser: {
          // 这也是系统默认配置8kb
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  指定大小
          },
        },
        generator: {
          filename: "img/[name].[hash:10][ext]",
        },
      },
      {
        exclude: /\.(less|css|html|gif|png|jpg|js)$/,
        type: "asset/resource",
        generator: {
          filename: "other/[hash:10][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
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
