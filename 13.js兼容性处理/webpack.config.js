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
        /**
         * js兼容性处理:babel-loader @babel/core @babel/preset-env
         * 	1.基本js兼容性处理 --> @babel/preset-env
         *  问题:只能转换基础语法,如const->var,但promise就不能转换
         * 	2.全部js兼容性处理 --> @babel/polyfill
         *  只需在源js代码中引入即可 import '@babel/polyfill'
         *  问题:会将所有兼容性代码引入,体积太大
         *  3.需要做兼容性处理的就做:按需加载 --> core-js
         *	2和3同时只能用一个
         */
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // 预设:指示babel做怎么样的兼容性处理
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: "60",
                  firefox: "50",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
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
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
}
