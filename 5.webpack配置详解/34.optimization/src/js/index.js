import count from "./count"
import("./add").then((add) => {
  console.log(add(1, 2))
})
console.log("index.js文件加载成功")
console.log(count(5, 2))
