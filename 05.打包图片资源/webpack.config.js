// 注意:webpack5自动处理图片资源,
// https://blog.csdn.net/qq_45178972/article/details/117631747
const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "build"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 问题:处理不了html中的img图片
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  指定大小
          },
        },
        generator: {
          // 在出口文件夹下创建img文件夹,图片名字为原来的名字+.8位哈希值+图片扩展名
          filename: "img/[name].[hash:8][ext]",
        },
      },
      {
        // 解决上面问题
        test: /\.html$/,
        // 处理html文件的img图片(负责引入img,从而能被asset处理)
        loader: "html-loader",
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
