const { resolve } = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
/**
 * PWA:渐进式网络开发应用程序（离线也可访问）
 * 	workbox -> workbox-webpack-plugin
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
    filename: "js/[name].[contenthash:10].js",
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
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.帮助serviceworker快速启动
       * 2.删除旧的serviceworker
       *
       * 需生成一个serviceworker配置文件（入口文件）
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: "production",
  devtool: "source-map",
}
