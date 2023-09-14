(async ()=>{
	var Project = require('../src/project')
	var Todo = require('../src/todo')
	var check = require("../lib/check")
	const db = require('better-sqlite3')('../db/foobar.db', {});
	var project = new Project(db)
	// check(true,true)
	project.add({id:1,name:"default"})
	check(project.list(),[ { id: 1, name: 'default' } ])
	var todo = new Todo(db)
	todo.clear()
	todo.add({id:1,subject:"todo 1",pid:1,checked:true})
	check(todo.list({pid:1}),[ { id: 1, subject: 'todo 1', checked: true, pid: 1 } ])
	todo.add({id:2,subject:"todo 2",pid:1,checked:true})
	check(todo.list({pid:1}),[ 
		{ id: 1, subject: 'todo 1', checked: true, pid: 1 },
		{ id: 2, subject: 'todo 2', checked: true, pid: 1 } 
		])
	project.clear()
	check(project.list(),[])
	check("OK")
})()