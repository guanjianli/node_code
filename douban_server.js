var db = require("./db_conf.js");
var _ = require("underscore");

exports.queryUser = function (obj, cb, reject) {
    db.execSql(
        "select * from user where name = ?;",
        [name],
        function selectCb(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            if (results) {
                cb(results);
            }
        }
    );
}

exports.insertMovie = (obj, cb) => {
	var pObj = _.pick(obj, 'id', 'name', 'info', 'image');//筛选过键值后的Obj
	console.log(JSON.stringify(pObj))
	db.execSqlOnce("replace into movie set ? ;" , pObj, (err, results, fields)=> {
		if (err) {
			console.log("DB Error :" + err)
			cb && cb(err);
			return;
		}          
		cb && cb(null, results);
    });
}