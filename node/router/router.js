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
            if(result.length == 0){
                res.send({"result":"-2"})
                return res.end()
            }
            if (result[0].password == data.password) { // 成功
                res.send({"result":"1"})
                return res.end()
            }
            res.send({"result":"-1"})
            res.end()
        })
    })
}