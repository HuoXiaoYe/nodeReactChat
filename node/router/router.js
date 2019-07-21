const queryString = require("querystring")

const xiaoye_db = require("../dao/dbase.js")

let xiaoye = new xiaoye_db('mongodb://localhost:27017','chat')



exports.doLogin = (req,res)=>{
    let namePassword = ""
    req.on("data",(chunk)=>{
        namePassword += chunk;
    }) 
    req.on("end",()=>{
        let data = JSON.parse(namePassword.toString())
        // console.log(data.username)
        xiaoye.find("userInfo",{"username":data.username},(err,result)=>{
            console.log(result)
            if(result[0].password == data.password){ // 成功
                res.send("1")
            }
            res.send("-1")
        })
    })
}