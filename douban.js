
var request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const _ = require("underscore");
const async = require("async");

//先读旧的文件
var oldList = JSON.parse(fs.readFileSync('done.txt', 'utf8'));

var getMovieUrl = function(cb){
    request('https://movie.douban.com', function (error, response, body) {
      console.log('statusCode:', response && response.statusCode); 
	  if(body){		
		  //const $ = cheerio.load(body);
          var m = body.match(/https[^http]+subject\/\d+\//g);
          //console.log(m)
          var l = _.uniq(m); // 对拿到的url，先进行去重
          
          //找出l中比oldList多的差集
          var diff = _.difference(l, oldList);
          
          handleDiff(diff);
          
          //fs.writeFileSync('done.txt', JSON.stringify(l));
          
          //console.log(fs.readFileSync('done.txt', 'utf8'));
	  }
    });
}

var handleDiff = (difMap)=>{
     //console.log(difMap);
     var l ;
     l = difMap.map((it)=>{
        return (cb)=>{
            requestDetail(it, cb)
        }
     });
    async.parallel(l, (err, results) => {
        // optional callback
        //console.log(results);
        console.log("all done");
    });
}

var requestDetail = (url, cb)=>{
    request(url, function (error, response, body) {
      console.log('statusCode:', response && response.statusCode); 
	  if(body){		
		  const $ = cheerio.load(body);
          var name = $("h1 span").text();
          var info = $("#info").text().split("\n").map((it)=>{
             return it.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
          })
          info = _.compact(info);//返回一个除去所有false值的 array副本。 在javascript中, false, null, 0, "", undefined 和 NaN 都是false值.
          var img = $("#mainpic img").attr("src");
          var total = _.extend({'name':name}, {'info':info}, {'image':img})
          console.log(JSON.stringify(total))
          //完成之后，合并到旧文件。
          cb(null, url);
	  }else{
          cb(new Error("no reachable"))
      }
    });
}
                      
getMovieUrl();
