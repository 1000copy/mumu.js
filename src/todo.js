class Todo{
	constructor(db){
		this.db = db
		this.init()
	}
	list(params){
		if(params && params.pid){
			var ls = this.db.prepare('SELECT * FROM todo where pid = ? ').all(params.pid);
			ls.forEach(element => element.checked = !! element.checked );
			return ls
		}else{
			var ls = this.db.prepare('SELECT * FROM todo ').all();
			ls.forEach(element => element.checked = !! element.checked );
			return ls
		}
	}
	add(params){
		if(!params.pid){
			const sm = this.db.prepare("insert into todo values(?,?,?)")
			sm.run(params.id,params.subject,params.checked?1:0)
		}else{
			const sm = this.db.prepare("insert into todo values(?,?,?,?)")
			sm.run(params.id,params.subject,params.checked?1:0,params.pid)
		}
	}
	remove(params){
		const sm = this.db.prepare("delete from todo where id = ?")
		sm.run(params.id)
	}
	async checked(params){
		const sm = this.db.prepare("update todo set checked = ? where id = ?")
		sm.run(!params.checked?1:0,params.id)
	}
	fin(){
		this.db.close()
	}
	clear(){
		const sm = this.db.prepare("delete from todo")
		sm.run()	
	}
	init(){
		const sm = this.db.prepare("create table IF NOT EXISTS todo(id integer,subject text,checked integer,pid integer)")
		sm.run()	
	}
}
// json
class Todo1 {
	list(){
		return this.json
	}
	async add(o){
		await this.reload()
		this.json.push(o)
		this.db.write(this.json)
		return o
	}
	async checked(o){
		// await this.reload()
		var find = this.json.find(function(el) { return el.id == o.id; })
		find.checked = !find.checked 
		await this.db.write(this.json)
		return o
	}
	
	async remove(o){
		this.json = this.json.filter(function(el) { return el.id != o.id; })
		await this.db.write(this.json)
		return o
	}
	//private
	constructor(db){
		this.db = db
		this.json = []
		this.reload()
	}
	async reload(){
		this.json = await this.db.read()
		return this.json
	}
	async clear(){
		this.json = []
		await this.db.write(this.json)
		return this.json
	}
}
module.exports = Todo