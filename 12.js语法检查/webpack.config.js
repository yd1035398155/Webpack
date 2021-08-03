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
      /**
       * 语法检查:eslint-loader eslint 
			 * airbnb --> eslint-config-airbnb-base eslint-plugin-import
       * 注意:只检查自己写的源代码,第三方的库是不用检查的
			 * 设置检查规则: 在package.json中设置
			 	 "eslintConfig": {
   			 "extends": "airbnb-base"
  				}

       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
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
