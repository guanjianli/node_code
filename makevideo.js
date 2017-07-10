
var request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

var save = function(cb){
	  request('http://www.private.com/scenes/', function (error, response, body) {
	  //console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  //console.log('body:', body); // Print the HTML for the Google homepage. 
	  if(body){		
		  const $ = cheerio.load(body);		  
		  $(".scene-thumb").slice(2, 3).map(function(){
			  console.log($(this).attr("href"))
			  var url = $(this).attr("href");
			  request(url, function (error, response, body) {
				  //console.log('error:', error); // Print the error if one occurred 
				  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
				  //console.log('body:', body); // Print the HTML for the Google homepage. 
				  if(body){		
					  var c = body.match(/"og:video".+\//)[0].replace("\" /","").match(/http.+/)[0];
					  console.log(c);
					  request.get(c).pipe(fs.createWriteStream('./public/'+c.slice(c.lastIndexOf("/")+1, c.length)))
				  }
			  })
		  })
	  }
	});
}

save();
	
//express 部分
exports.init = function(app){
	app.get("/girl", function (req, res) {
		//res.writeHead(200);
		save(function(){
			res.end('All girls is update');
		});
	});
	app.get("/av/*", function (req, res) {
		//res.writeHead(200);
		console.log(req.url)
		var r = req.url.replace(/av\//, "");
		if (req.method === 'GET' || req.method === 'HEAD') {
		  request.get("https://images.sex.com"+r).pipe(res)
		}
	});
}