const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// 1.引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// 设置nodejs环境变量
process.env.NODE_ENV = "development"
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
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          /**
           * css兼容性处理:postcss-->postcss-loader postcss-preset-env
           * 帮postcss找到package.json中的browserslist里面的配置,通过配置加载指定的css兼容性样式
					 * 
					 * 
					   "browserslist": {
							默认的环境是生产环境,需要在本文件开头设置为开发环境-->process.env.NODE_ENV = "development"
							
    				 "development": [
    				   "last 1 chrome version",
    				   "last 1 firefox version",
    				   "last 1 safari version"
    				 ],
    				 "production": [
    				   ">0.2%",
    				   "not dead",
    				   "not op_mini all"
    				 ]
  					}
           */
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
        ],
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
