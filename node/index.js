const express = require("express")


const router = require("./router/router.js")



let app = express()

app.use((req,res,next)=>{ // 设置跨域请求
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    next()
})


// 登录验证
app.post("/login",router.doLogin)
app.post("/regist",router.doRegist)
app.get("/getartical",router.getArtical)
app.get("/getallcount/:collextionname",router.getAllCount)
app.get("/userinfo/:username",router.getUserInfo)
app.post("/update",router.update)
app.post("/updatecomment",router.updateComment)

app.listen(4000)