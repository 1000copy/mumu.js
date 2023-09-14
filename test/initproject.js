(async ()=>{
	var Project = require('../src/project')
	var Todo = require('../src/todo')
	var check = require("../lib/check")
	const db = require('better-sqlite3')('../db/foobar.db', {});
	var project = new Project(db)
	project.clear()
	project.add({id:1,name:"default"})
	project.add({id:2,name:"project1"})
	// check(project.list(),[ { id: 1, name: 'default' } ])
	var todo = new Todo(db)
	todo.clear()
	todo.add({id:1,subject:"todo 1",pid:1,checked:true})
	todo.add({id:2,subject:"todo 2",pid:1,checked:true})
	todo.add({id:3,subject:"todo 11",pid:2,checked:true})
	todo.add({id:4,subject:"todo 22",pid:2,checked:true})
	check(todo.list({pid:1}),[ 
		{ id: 1, subject: 'todo 1', checked: true, pid: 1 },
		{ id: 2, subject: 'todo 2', checked: true, pid: 1 } 
		])
	check("OK")
})()