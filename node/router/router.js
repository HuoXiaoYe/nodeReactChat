const queryString = require("querystring")

const xiaoye_db = require("../dao/dbase.js")

let xiaoye = new xiaoye_db('mongodb://localhost:27017', 'chat')



exports.doLogin = (req, res) => {
    let namePassword = ""
    req.on("data", (chunk) => {
        namePassword += chunk;
    })
    req.on("end", () => {
        let data = JSON.parse(namePassword.toString())
        xiaoye.find("userInfo", { "username": data.username }, (err, result) => {
            if (result.length == 0) {
                res.send({ "result": "-2" })
                return res.end()
            }
            if (result[0].password == data.password) { // 成功
                res.send({ "result": "1" })
                return res.end()
            }
            res.send({ "result": "-1" })
            res.end()
        })
    })
}

exports.doRegist = (req, res) => {
    let namePassword = ""
    req.on("data", (chunk) => {
        namePassword += chunk;
    })
    req.on("end", () => {
        let data = JSON.parse(namePassword.toString())
        // 查找数据库中有没有这个用户名
        xiaoye.find("userInfo", { "username": data.username }, (err, result) => {
            if (result.length == 0) { // 没有该用户 可以注册

                // res.send({ "result": "1" })
                // return res.end()

                xiaoye.insert("userInfo", data, (err, result) => {
                    res.json({ "result": "1" })
                    return res.end()
                })
            } else if (result.length == 1) { // 该用户名已存在
                res.send({ "result": "-1" })
                return

            }
        })
    })
}