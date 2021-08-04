const { resolve } = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

/**
 * 缓存:
 * 	比如有100个js模块，其中1个变了，那么应该只变这1个js文件，其他99个不变
 * 	与HRM热更新很像,但HRM是用于开发环境下的devServer的,不能用于生产环境。
 *  解决：用缓存
 * 	babel缓存:
 * 		在options中加 cacheDirectory:true
 * 	文件资源缓存:
 * 		hash:每次webpack构建时会生成唯一的hash值
 * 			问题:因为js和css同时使用一个hash值
 * 			如果重新打包，会导致所有缓存失效（可能我却只改一个文件）
 * 		chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样。
 * 			问题：js和css同属于一个chunk，hash值还是一样
 * 		contenthash:根据文件的内容生成hash值。不同文件hash值一定不同
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
