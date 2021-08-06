const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名 优点:简写路径 缺点:路径没有提示
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    // 配置省略文件的后缀名:import时 可以不写后缀名
    // 注意:如果有index.js和index.css,那么只会找到在数组第一位的js文件
    extensions: [".js", ".css", ".json", ".jsx"],
    // 告诉webapck 解析模块时 去找哪个目录(如果不指定,就会一层一层的向上目录查找)
    modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
  },
}
