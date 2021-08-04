const { resolve } = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

process.env.NODE_ENV = "production"

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    // 兼容性处理:还需在package.json中设置需要满足哪些设置
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
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // 代码风格:还需在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        // 以下loader只会匹配一个
        // 注意:不能有两个loader处理同一种类型的文件
        // 解决:提到oneOf外,rules内
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
      filename: "css/built.css",
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
}
