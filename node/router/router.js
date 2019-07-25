
const path = require("path")
const fs = require("fs")
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
                console.log(result[0].avatar)
                res.send({ "result": "1", "avatar": result[0].avatar })
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




exports.getArtical = (req, res) => {
    let queryObj = req.query
    xiaoye.find("artical", {}, { pageSize: queryObj.pageSize, page: queryObj.page, sort: { 'datetime': -1 } }, (err, result) => {
        res.json(result)
        res.end()
        return
    })
}
exports.getAllCount = (req, res) => {

    xiaoye.getAllCount(req.params.collextionname, (count) => {
        res.end(count.toString())
    })
}


exports.getUserInfo = (req, res) => {
    let username = req.params.username
    xiaoye.find("userInfo", { username }, (err, result) => {
        res.send(result)
        res.end()
    })
}

exports.update = (req, res) => {
    let datastr = ""
    req.on("data", (chunk) => {
        datastr += chunk
    })
    req.on("end", () => {
        let dataObj = JSON.parse(datastr.toString())
        let imgdata = dataObj.avatar;
        let username = dataObj.username;
        let re = /data\:image\/(.{3,10})\;base64/
        let extname = re.exec(imgdata)[1] // 获取扩展名  没有 .
        let tempname = Math.floor(Math.random() * 9999999 + 1000000) + '.' + extname;
        let fileName = path.join(__dirname, '../.././public/images', tempname)
        var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer.from(base64Data, 'base64');
        fs.writeFile(fileName, dataBuffer, function (err) {
            xiaoye.update("userInfo", { username }, {
                avatar: "/images/" + tempname
            }, (err, result) => {
                if (err) return res.end("-1")
                res.json({
                    result : '1',
                    avatar : "/images/" + tempname
                })
                res.end()
            })
        });
    })



}


