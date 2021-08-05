// 安装 npm i webpakc-dev-server -D
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
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 打包其他资源(除了html/css/js外的资源)
      {
        exclude: /\.(html|css|js)$/,
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
    }),
  ],
  mode: "development",
  // 开发服务器 devServer:用来自动化(自动编译,自动打开浏览器,自动刷新浏览器)
  // 特点:只会在内存中编译打包,不会有任何输出
  // 启动devServer指令为:npx webpack server
  devServer: {
    // 运行项目的目录.打包后文件的位置
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
}
