// var check = require("../../lib/check")
function dbinit(dbfile,sqlfile){
	const db = require('better-sqlite3')(dbfile, {});
	try{
		var row = db.prepare('select version from meta').get()
		// check(row,{version:1})	
		console.log("db exists")
	}catch(e){
		// db not exists
		console.log("db not exists.creating...")
		var t = textfrom(sqlfile)
		db.exec(t)
		console.log("creating OK")
		var row = db.prepare('select version from meta').get()
		// check(row,{version:1})	
	}
}
function textfrom(f){
	var fs = require('fs');
	try {  
	    var data = fs.readFileSync(f, 'utf8')
	    return data.toString()
	} catch(e) {
	    console.log('Error:', e.stack);
	}
}
module.exports.dbinit = dbinit