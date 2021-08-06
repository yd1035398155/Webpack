const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
    chunkFilename: "js/[name].[contenthash:10]_chunk.js",
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
  mode: "production",
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
  optimization: {
    splitChunks: {
      chunks: "all",
      // // 默认值,可以不写
      // // 分割的chunk最小为30kb,小于30kb不分割
      // minSize: 30 * 1024,
      // // 最大没有限制
      // maxSize: 0,
      // // 要提取的chunk最少被引用1次
      // minChunks: 1,
      // // 按需加载时并行加载文件的最大数量
      // maxAsyncRequests: 5,
      // // 入口js文件最大并行请求数量
      // maxInitialRequests: 3,
      // // 名称连接符
      // automaticNameDelimiter: "~",
      // // 拆分chunk的名称,false将保持chunk的相同名称
      // name: false,
      // cacheGroups: {
      //   // 分割chunk的组
      //   // node_modules文件会被打包到 vendors 组的chunk中 --> vendors~xxx.js
      //   // 满足上面的公共规则,如大小超过30kb,至少被引用一次
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     // 如果当前要打包的模块,和之前已经被提取的模块是同一个,就会复用,而不是重新打包模块
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    // 将当前模块记录的其他模块hash单独打包为一个文件runtime
    // 解决:缓存失效的问题(当一个文件发生变化,main里对应的hash也会变化,所以会全部重新打包)
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置 生产环境的压缩方案:js和css
      new TerserPlugin({
        // 开启多进程打包
        parallel: true,
      }),
    ],
  },
}
