function dbready(dbname,sqlpath){
	var path = require("path")
	if (!path.existsSync(db)) { 
		// create.sql
 		const db = require('better-sqlite3')(dbname, {});
 		var sql = readTextFromFile('c.sql')
 		db.exec(sql)
	}else{
		var build = 1
		const db = require('better-sqlite3')(dbname, {});
		var row = db.prepare('select build from meta').get()
		build = row.build
		// alter.sql
	    var files = find(build)
	    for (const file of files) {
		  // console.log(file);
	      db.exec(readTextFromFile(file))
		}
	}
}
const DBNAME= "a.sqlite"
var dbpath = "./"
dbready(DBNAME,dbpath)
function readTextFromFile(f){
	var fs = require('fs');
	try {  
	    var data = fs.readFileSync(f, 'utf8')
	    return data.toString()
	} catch(e) {
	    console.log('Error:', e.stack);
	}
}
function find(build){
	const fs = require('fs');
	const dirCont = fs.readdirSync("./");
	const files = dirCont.filter( ( file ) => file.match(/a\.*\.(sql)/ig) && getbuild(file) > build)
}
function getbuild(file){
	// > getbuild("w.112.sql")
	//[ '.112.sql', '112', index: 1, input: 'w.112.sql', groups: undefined ]
	var r = file.match(/\.(\d+)+\.sql/)
	if (r && r.length > 2)
		return r[1]
	else
		return 0
}