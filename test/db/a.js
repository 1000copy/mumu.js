var check = require("../../lib/check")
const dbname = "a.better.sqlite3"
const db = require('better-sqlite3')(dbname, {});
// exec
var row = db.exec(`drop table if exists meta;drop table if exists meta1;
	create table if not exists meta(version integer);
	create table if not exists meta1(version integer);
	insert into meta values(1);
	insert into meta values(2);
	insert into meta1 values(1.1)
	`)
// query
var row = db.prepare('select version from meta').get()
check(row,{version:1})
var row = db.prepare('select version from meta').all()
check(row,[{version:1},{version:2}])

var row = db.prepare('select version from meta where version > ?').all(1)
check(row,[{version:2}])
function textfrom(f){
	var fs = require('fs');
	try {  
	    var data = fs.readFileSync(f, 'utf8')
	    return data.toString()
	} catch(e) {
	    console.log('Error:', e.stack);
	}
}
var t = textfrom('a.better.sql')
db.exec(t)
var row = db.prepare('select version from meta').get()
check(row,{version:1})
var row = db.prepare('select version from meta').all()
check(row,[{version:1},{version:2}])
