const MongoClient = require("mongodb").MongoClient


class xiaoye_db {
	constructor(urlName, databaseName) {
		this.urlName = urlName;
		this.databaseName = databaseName;
	}
	_connect(callback) {
		MongoClient.connect(this.urlName, { useNewUrlParser: true }, (err, db) => {
			callback(err, db);
			db.close() // 关闭数据库
		})
	}
	insert(collectionName, json, callback) {
		this._connect((err, db) => {
			if (err) return console.log("连接数据库失败");
			let dbase = db.db(this.databaseName);
			console.log(!Array.isArray(json))
			if (!Array.isArray(json)) { // 添加一条数据
				dbase.collection(collectionName).insertOne(json, (err, result) => {
					return callback && callback(err, result)
				})
			} else {
				// 添加多条数据
				dbase.collection(collectionName).insertMany(json, (err, result) => {
					return callback && callback(err, result)
				})
			}

		})
	}
	find(collectionName, json, args, callback) {
		this._connect((err, db) => {
			if (err) return console.log("数据库连接失败")
			if (arguments.length == 3 && typeof args == "function") {
				callback = args;
				var skipAmount = 0;
				var limitNumber = 0;
				var sortObj = {};
			} else {
				var skipAmount = parseInt(args.pageSize) * parseInt(args.page) || 0;
				var limitNumber = parseInt(args.pageSize) || 0;
				var sortObj = args.sort || {};
			}
			let dbase = db.db(this.databaseName)

			dbase.collection(collectionName).find(json).limit(limitNumber).skip(skipAmount).sort(sortObj).toArray((err, result) => {
				callback && callback(err, result)
			})
		})
	}
	update(collectionName, json1, json2, callback, isPush) { // 更新函数
		this._connect((err, db) => {
			if (err) return console.log("数据库连接失败")
			let dbase = db.db(this.databaseName)
			if (!isPush) {
				dbase.collection(collectionName).updateMany(json1, { $set: json2 }, (err, result) => {
					callback && callback(err, result)
				})
			} else if (isPush) {
				dbase.collection(collectionName).updateMany(json1, { $push: { "commments": { $each: [json2] } } }, (err, result) => {
					callback && callback(err, result)
				})
			}
		})
	}
	removeData(collectionName, json, callback) { // 删除函数
		this._connect((err, db) => {
			if (err) return console.log("数据库连接失败")
			let dbase = db.db(this.databaseName)
			dbase.collection(collectionName).deleteMany(json, (err, result) => {
				callback && callback(err, result)
			})
		})
	}

	// getAllCount(collectionName, callback) { // 获取所有个数
	// 	this._connect((err, db) => {
	// 		if (err) return console.log("数据库连接失败")
	// 		let dbase = db.db(this.databaseName)
	// 		dbase.collection(collectionName).count({}).then((count) => {
	// 			callback && callback(count);
	// 		});
	// 	})




	// }

	getAllCount(collectionName, callback) { // 获取所有个数
		this._connect((err, db) => {
			if (err) return console.log("数据库连接失败")
			let dbase = db.db(this.databaseName)
			dbase.collection(collectionName).countDocuments({}).then((count) => {
				callback && callback(count);
			});
		})
	}
}



module.exports = xiaoye_db



