console.log("index.js加载成功")
// import { mul } from "./test"

document.getElementById("btn").onclick = () => {
  // 懒加载:当文件需要使用时才加载
  // 预加载(慎用，浏览器支持):prefetch:会在使用前,提前加载js文件.等其他资源加载完,浏览器空闲时,再加载
  // 正常加载可以认为是并行加载(同时加载多个文件)
  import(/* webpackChunkName:'test',webpackPrefetch:true */ "./test").then(({ mul }) => {
    console.log(mul(4, 5))
  })
}
