"use strict"
;(self.webpackChunk = self.webpackChunk || []).push([
  [179],
  {
    253: function (n, e, o) {
      var s = function (n, e) {
        return n - e
      }
      o
        .e(251)
        .then(o.bind(o, 251))
        .then((n) => {
          console.log(n(1, 2))
        }),
        console.log("index.js文件加载成功"),
        console.log(s(5, 2))
    },
  },
  function (n) {
    var e
    ;(e = 253), n((n.s = e))
  },
])
