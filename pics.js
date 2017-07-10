
var request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

var save = function(cb){
    for(var i=1;i<=48;i++)
    {
        try{
            var c = 'http://chinesepornpics.com/gallery/Mix_of_asian_whores__mature_chubby_slim_tits/'+i+'.jpg';
            request.get(c).pipe(fs.createWriteStream('./public/Mix_of_asian_whores__mature_chubby_slim_tits'+c.slice(c.lastIndexOf("/")+1, c.length)));
        }catch(e){
            console.log(i+e)
        }
        
    }
	 
}

save();
