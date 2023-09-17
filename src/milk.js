// id qty d/date t/time
class Milk{
	constructor(db){
		this.db = db
	}
	list(params){
		if(params && params.date){
			var ls = this.db.prepare('SELECT * FROM Milk where d = ? ').all(params.date);
			return ls
		}else{
			var ls = this.db.prepare('SELECT * FROM Milk ').all();
			return ls
		}
	}
	add(params){
		const sm = this.db.prepare("insert into Milk values(?,?,?,?)")
		sm.run(params.id,params.qty,params.d,params.t)
	
	}
	remove(params){
		const sm = this.db.prepare("delete from Milk where id = ?")
		sm.run(params.id)
	}
	fin(){
		this.db.close()
	}
	clear(){
		const sm = this.db.prepare("delete from Milk")
		sm.run()	
	}
}
module.exports = Milk