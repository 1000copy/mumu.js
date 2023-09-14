const check = require("../lib/check")
check("OK")
const db = require('better-sqlite3')('foobar.db', {});
// db.exec("create table todo (id integer,subject text,checked integer)")
// const sm = db.prepare("insert into todo values(?,?,?)")
// sm.run(1,"Preying",0)
// sm.run(1,"Loving",0)
// sm.run(1,"Eating",1)
// const row = db.prepare('SELECT * FROM todo ').all();
// console.log(row);

class Todo{
	constructor(db){
		this.db = db
	}
	list(){
		var ls = this.db.prepare('SELECT * FROM todo ').all();
		ls.forEach(element => element.checked = !! element.checked );
		return ls
	}
	add(params){
		const sm = this.db.prepare("insert into todo values(?,?,?)")
		sm.run(params.id,params.subject,params.checked?1:0)
	}
	remove(params){
		const sm = this.db.prepare("delete from todo where id = ?")
		sm.run(params.id)
	}
	fin(){
		this.db.close()
	}
	clear(){
		const sm = this.db.prepare("delete from todo")
		sm.run()	
	}
	init(){
		const sm = this.db.prepare("create table todo(id integer,subject text,checked integer)")
		sm.run()	
	}
}
let t = new Todo(db)
// t.init()
t.clear()
t.add({id:1,subject:"Preying",checked:false})
console.log(t.list())
t.fin()