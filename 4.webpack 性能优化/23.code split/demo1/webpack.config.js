const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    // 多入口:有多少个入口,就有多少bundle
    main: "./src/js/index.js",
    test: "./src/js/test.js",
  },
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
}
