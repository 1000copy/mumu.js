// id qty d/date t/time
class Milk{
	constructor(db){
		this.db = db
	}
	chart(params){
		var rs = this.db.prepare(`select d,sum(qty) as q from milk where d <= date('now') and d >=date('now','-7 days') group by d  order by d asc`).all()
		const labels = rs.map((value)=>value.d)
		const qtys = rs.map((value)=>value.q)
		console.log(rs)
		var data =  {
			labels,//: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange1'],
			datasets: [{
				label: 'milk sum',
				data: qtys,//[12, 19, 3, 5, 2, 3],
				borderWidth: 1
			}]
		}
		return data
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
	total(params){
		if(params && params.date){
			var ls = this.db.prepare('SELECT sum(qty) as total FROM Milk where d = ? ').get(params.date);
			return ls
		}else{
			var ls = this.db.prepare('SELECT sum(qty) as total FROM Milk ').get();
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