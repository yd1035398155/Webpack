const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

process.env.NODE_ENV = "development"
module.exports = {
  entry: ["./src/js/index.js", "./src/index.html"],
  output: {
    filename: "js/main.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 处理html中的img
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(gif|png|jpg)/,
        type: "asset",
        parser: {
          // 这也是系统默认配置8kb
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb  指定大小
          },
        },
        generator: {
          filename: "img/[name].[hash:10][ext]",
        },
      },
      {
        exclude: /\.(less|css|html|gif|png|jpg|js)$/,
        type: "asset/resource",
        generator: {
          filename: "other/[hash:10][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Development",
    }),
  ],
  mode: "development",
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    hot: true,
  },
  devtool: "cheap-module-source-map",
}
/**
 * source-map:一种提供源代码到构建后代码映射的技术(如果构建后代码出错了,通过映射关系可以追踪源代码错误)
 *	[inline-|hidden-|eval-] [nosources-] [cheap-[module-]]source-map
								1                2              3
		三者可任意组合,但要注意顺序
	
 		source-map:外部
			错误代码的准确信息 和 源代码的错误位置
		inline-source-map:内联,只生成一个内联source-map
			错误代码的准确信息 和 源代码的错误位置
		hidden-source-map:外部
			错误代码的准确信息,但没有源代码的错误位置,不能追踪源代码错误,只能提示到构建后代码的错误位置
		eval-source-map:内联,每个文件都生成对应的source-map,都在eval里
			错误代码的准确信息 和 源代码的错误位置
		nosources-source-map:外部
			错误代码的准确信息,但没有任何源代码信息
		cheap-source-map:外部
			错误代码的准确信息 和 源代码的错误位置
			只能精确到行
		cheap-module-source-map:外部
			错误代码的准确信息 和 源代码的错误位置
			module会将loader的source-map加入
		开发环境:速度快,调试更友好
			速度快(eval>inline>cheap>...)
				eval-cheap-source-map
				eval-source-map
			调试更友好:
				source-map
				cheap-module-source-map
				cheap-source-map
			折中:调试友好和速度快--> eval-source-map/ eval-cheap-module-source-map
		生产环境:源代码要不要隐藏?调试要不要更友好
			内联会让代码体积变大,所以生产环境不用
			nosources-source-map:全部隐藏
			hidden-source-map:只隐藏源代码,会提示构建后代码错误信息
			-->source-map/cheap-module-source-map 

		内联和外部的区别:1.外部生成了文件,内联没有 2.内联构建速度更快
 */
