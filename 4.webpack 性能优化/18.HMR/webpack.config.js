/**
 * HMR: hot module replacement 热模块替换
 * 作用:一个模块发生变化,只会重新打包这一个模块(而不是打包所有模块)
 * 极大提升构建速度
 *
 * 样式文件:可以使用HMR功能,因为style-loader内部实现了(开发模式用style-loader,生产模式css单独打包)
 * js文件:默认不能使用HMR功能-->需要修改index.js代码,添加支持HMR功能的代码
 * 	注意:HMR功能只能处理非入口js文件的其他文件
 * html文件:默认不能使用HMR功能,同时html不能热更新
 * 解决:修改entry入口,将html文件引入(解决了刷新不了的问题,但还是不能做HMR功能(所有模块会刷新而不是html单独刷新),因为整个项目就一个html文件)
 */

const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

process.env.NODE_ENV = "development"
module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
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
      template: "./src/index.html",
      title: "Development",
    }),
  ],
  mode: "development",
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    hot: true,
  },
}
