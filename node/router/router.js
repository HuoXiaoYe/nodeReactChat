
const path = require("path")
const fs = require("fs")
const xiaoye_db = require("../dao/dbase.js")
const ObjectId = require('mongodb').ObjectID;


let xiaoye = new xiaoye_db('mongodb://localhost:27017', 'chat')



exports.doLogin = (req, res) => { // 登陆处理
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
                res.send({ "result": "1", "avatar": result[0].avatar })
                return res.end()
            }
            res.send({ "result": "-1" })
            res.end()
        })
    })
}

exports.doRegist = (req, res) => { // 注册处理
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




exports.getArtical = (req, res) => { // 获取所有说说列表
    let queryObj = req.query
    xiaoye.find("artical", {}, { pageSize: queryObj.pageSize, page: queryObj.page, sort: { 'datetime': 1 } }, (err, result) => {
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
        if (imgdata) { // 用户修改了头像
            let re = /data\:image\/(.{3,10})\;base64/
            let extname = re.exec(imgdata)[1] // 获取扩展名  没有 .
            let tempname = Math.floor(Math.random() * 9999999 + 1000000) + '.' + extname;
            let fileName = path.join(__dirname, '../.././public/images', tempname)
            var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer.from(base64Data, 'base64');
            dataObj.avatar = "/images/" + tempname;
            fs.writeFile(fileName, dataBuffer, function (err) {
                xiaoye.update("userInfo", { username }, dataObj, (err, result) => {
                    if (err) {
                        return res.end("-1")
                    }
                    res.send({
                        result: '1',
                        avatar: "/images/" + tempname
                    })
                    res.end()
                })
            });
        } else {
            xiaoye.update("userInfo", { username }, dataObj, (err, result) => {
                if (err) {
                    return res.end("-1")
                }
                res.send({
                    "result": "1"
                })
                res.end()
            })
        }
    })



}

exports.updateComment = (req, res) => {
    let datastr = ""
    req.on("data", (chunk) => {
        datastr += chunk
    })

    req.on("end", () => {
        let dataObj = JSON.parse(datastr.toString())
        // console.log(dataObj)
        let json1 = { "_id": ObjectId(dataObj.id) }
        let json2 = {
            "name": dataObj.name,
            "avatar": dataObj.avatar,
            "datetime": dataObj.datetime,
            "content": dataObj.content
        }

        // 怎么通过 id
        // xiaoye.find("artical", json1, (err, result) => {
        //     console.log(result)
        //     res.send(result)
        //     res.end()
        // })
        xiaoye.update("artical", json1, json2, (err, result) => {
            if (err) {
                return res.end("-1")
            }
            res.send({
                "result": "1"
            })
            res.end()
        },true)
    })
}

exports.getMyList = (req,res)=>{
    // 根据 username 查找对应的文章说说
    xiaoye.find("artical",{name:req.params.username},{sort: { 'datetime': 1 }},(err,result)=>{
        res.json(result);
        res.end();
    })
}

// exports.getMyListCount= (req,res)=>{
//     // 根据 username 查找对应的文章说说的总个数
//     xiaoye.getAllCount("artical",{name:req.params.username},{sort: { 'datetime': 1 }},(err,result)=>{
//         res.json(result);
//         res.end();
//     })
// }


exports.addItem = (req,res)=>{
    let dataStr = "";
    req.on("data",(chunk)=>{
        dataStr += chunk
    })
    req.on("end",()=>{
        // insert(collectionName, json, callback)
        let dataObj = JSON.parse(dataStr.toString())
        // console.log(dataObj)
        let name = dataObj.name;
        xiaoye.insert("artical",dataObj,(err,result)=>{
            if(err){
                res.json({"result":"-1"})
                res.end();
                return;
            }
            res.json({"result":"1"})
            res.end();
        })

    })
}





