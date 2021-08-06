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
  devServer: {
    contentBase: resolve(__dirname, "build"),
    // 监视cententBase目录下的所有文件,一旦代码变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    compress: true,
    port: 8080,
    host: "localhost",
    open: true,
    // 开启HMR功能
    hot: true,
    // 隐藏启动服务器日志信息
    clientLogLevel: "none",
    // 只显示基本的启动内容
    queit: true,
    // 如果出错,不要全屏提示
    overlay: false,
    // 服务器代理-->解决开发环境跨域问题
    // 浏览器与服务器之间存在跨域,服务器与服务器不存在跨域
    proxy: {
      // devServer(8080)服务器接收到/api/xxx的请求,就会把请求转发到另一台服务器(3000)
      "/api": {
        target: "http://localhost:3000",
        // 发送请求时,请求路径重写:将'/api/xxx'--> '/xxx'(去掉'/api')
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}
