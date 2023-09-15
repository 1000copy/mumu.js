class Project{
	constructor(db){
		this.db = db
		// this.init()
	}
	list(){
		var ls = this.db.prepare('SELECT * FROM project ').all();
		return ls
	}
	add(params){
		const sm = this.db.prepare("insert into project values(?,?)")
		sm.run(params.id,params.name)
	}
	remove(params){
		var ls = this.db.prepare('SELECT * FROM todo where todo.pid = ?').all(params.id);
		if(ls.length >0)
			throw new Error(`project ${params.name} was referenced by todo`)
		const sm = this.db.prepare("delete from project where id = ?")
		sm.run(params.id)
	}
	fin(){
		this.db.close()
	}
	clear(){
		const sm = this.db.prepare("delete from project")
		sm.run()	
	}
	init(){
		const sm = this.db.prepare(`
			create table IF NOT EXISTS project(id integer,name text)
			`)
		sm.run()	
	}
}
module.exports = Project