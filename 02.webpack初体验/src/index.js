/* 
index.js:webpack入口起点文件 
1.运行指令
	开发环境:webpack ./src/index.js -o ./build/built.js --mode=development
	翻译:   webpack会以 ./src/index.js 为入口文件开始打包,打包后输出到 ./build/built.js
	整体打包环境,是开发环境
	生产环境:webpack ./src/index.js -o ./build/built.js --mode=production
	整体打包环境,是生产环境

2.结论:
	1.webpack能处理js/json资源,但不能处理其他资源.
	2.生产和开发环境将ES6模块化编译成浏览器能识别的模块化.
	3.生产环境比开发环境多一个压缩js代码.
*/
import data from "./data.json"
import "./index.css"
console.log(data)
function add(x, y) {
  return x + y
}
console.log(add(1, 2))
