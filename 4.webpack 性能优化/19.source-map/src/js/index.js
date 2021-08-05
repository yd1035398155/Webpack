import "../css/index.less"
import "../css/index.css"
import "../css/iconfont.css"
import print from "./print"
console.log("index.js文件被加载了~")
function add(a, b) {
  return a + b
}
print()
console.log(add(5, 6))

if (module.hot) {
  module.hot.accept("./print.js", function () {
    // 方法会监听print.js文件的变化,一旦发生变化,其他模块不会重新打包构建
    // 会执行后面的回调函数
    print()
  })
}
