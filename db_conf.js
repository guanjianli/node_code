var mysql = require('mysql');

const option = {
	host: 'qdm203823661.my3w.com',
	user: 'qdm203823661',
	password: 'liguanjian',
	database: 'qdm203823661_db',
	dateStrings: true,
	multipleStatements: false,
	insecureAuth: true
}
var pool;
var startPool = function(){
	pool = mysql.createPool(option);
	pool.on('release', function (connection) {
	  console.log('Connection %d released', connection.threadId);
	});
}

var execSql = function (sql, params, callback) {
	if(!pool) startPool();//如果没有开启连接池，就开启,全部不用时，记得释放。
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err);
        } else {
            conn.query(sql, params, function (error, results, fields) {
                conn.release();
                callback(error, results, fields);
            });
        }
    });
};

/*每次都会建立一个链接*/
var execSqlOnce = function(sql, params, callback){
	var connection = mysql.createConnection(option);
	connection.connect();
	connection.query(sql, params, function (err, results, fields) {
	  if (err){ callback(err); return;}
	  callback(err, results, fields);
	});
	connection.end();
}

exports.endPool = function(){
	pool && pool.end(function (err) {
	  console.log("all connections in the pool have ended, pool.getConnection and other operations can no longer be performed")
	});
}

exports.execSql = execSql;
exports.pool = pool;
exports.execSqlOnce = execSqlOnce;
