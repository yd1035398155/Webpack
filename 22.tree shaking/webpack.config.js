const { resolve } = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

/**
 * tree shaking: 去除无用代码
 * 	前提:1.必须使用ES6模块化 2. 开启production环境
 * 	作用:减少代码体积
 *  在package.json中配置
 * 	"sideEffects":false 所有代码都没有副作用(都可以进行tree shaking)
 * 		问题:可能会把css/@babel/polyfill文件干掉
 * 		解决: "sideEffects":["*.css"]
 */

process.env.NODE_ENV = "production"

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [require("postcss-preset-env")],
      },
    },
  },
]
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "built.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
          },
          {
            test: /\.scss$/,
            use: [...commonCssLoader, "scss-loader"],
          },
          {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: 3 },
                    targets: {
                      chrome: "60",
                      firefox: "50",
                      ie: "9",
                    },
                  },
                ],
              ],
              // 开启babel缓存
              // 第二次构建是,会读取之前的缓存
              cacheDirectory: true,
            },
          },
          {
            test: /\.(gif|png|jpg)$/i,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024,
              },
            },
            generator: {
              filename: "img/[name].[hash:10][ext]",
            },
          },
          {
            test: /\.html$/,
            loader: "html-loader",
          },
          {
            exclude: /\.(js|css|html|png|jpg|gif|less|scss)$/i,
            type: "asset/resource",
            generator: {
              filename: "other/[name].[hash:10][ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/built.[contenthash:10].css",
    }),
    new CssMinimizerPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
  devtool: "source-map",
}
