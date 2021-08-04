function sum(...args) {
  return args.reduce((a, b) => a + b, 0)
}
/**
 * 通过js代码,让某个文件被单独打包成一个chunk
 */
import(/* webpackChunkName:'test' */ "./test")
  .then(({ mul, add }) => {
    console.log(mul(2, 5))
  })
  .catch(() => {
    console.log("文件加载失败")
  })
// eslint-disable-next-line
console.log(sum(1, 2, 3))
