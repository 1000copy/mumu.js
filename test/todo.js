(async ()=>{
	const db = require('better-sqlite3')('../db/foobar.db', {});
	var Todo = require('../src/todo')
	var check = require("../lib/check")
	var todo = new Todo(db)
	check(true,true)
	todo.add({id:1,subject:"todo 1",checked:false,pid:1})
	// return 
	check( todo.list(),[ { id: 1, subject: 'todo 1', checked: false, pid: 1 } ],'reload failure',true)
	todo.remove({id:1})
	check( todo.list(),[],'reload failure',true)
	todo.clear()
	check( todo.list(),[],'reload failure',true)
	check("OK")
})()