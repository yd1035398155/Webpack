/**
 * 服务器代码
 * 启动服务器指令:
 * 	node server.js
 * 地址:
 *	http://localhost:3000
 */

const express = require("express")
const app = express()
app.use(express.static("build", { maxAge: 1000 * 360 }))
app.listen(3000)
