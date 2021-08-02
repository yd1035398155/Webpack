// 注意:webpack5自动处理图片资源,
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  指定大小
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
}
