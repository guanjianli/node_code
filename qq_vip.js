var request = require('request');
/**
*这个ADSESSION是QQ的登录时间。
*http://vip.qq.com/my/index.html?ADUIN=418197255&ADSESSION=1499825598&ADTAG=CLIENT.QQ.5527_.0&ADPUBNO=26630
*
*升级之后，好像版本号都有变化
*/
var loginUrl = "http://vip.qq.com/my/index.html?ADUIN=418197255&ADSESSION=1499852865&ADTAG=CLIENT.QQ.5533_.0&ADPUBNO=26719"

var checkInUrl = "http://iyouxi.vip.qq.com/ams3.0.php?_c=page&actid=23314&g_tk=52fd43db5fd3abcb0c6c99a920f05bb7&callback=?"			

var options = {
  url: '',
  headers: {
    'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
	'Cookie':'RK=Sd3OxmtKQG; pt2gguin=o0418197255; uin=o0418197255; skey=@36QE1kATQ; ptisp=cnc; ptcz=d4fbe6e8bcbb3c6f28a981bee76060bd11ea8cf499df97e98ca2c3a583862bbb; pgv_info=ssid=s5708109128; ts_last=vip.qq.com/my/index.html; ts_refer=ADTAGCLIENT.QQ.5533_.0; pgv_pvid=9339154170; ts_uid=5726661280'
  }
};
 
function LoginCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
	  var name = body.match(/健力.{0,1}/g);
	  if(name){
		  console.log("登录<" + name[0] + ">成功");
		  console.log("开始签到")
		  options.url = checkInUrl;
		  request(options, CheckInCallback);
	  }
  }
}

function CheckInCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
	  console.log("签到结果",JSON.parse(body).msg)
	  //console.log(body);
  }
}

options.url = loginUrl;
request(options, LoginCallback);