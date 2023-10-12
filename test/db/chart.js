var check = require("../../lib/check")
const dbname = "a.better.sqlite3"
const db = require('better-sqlite3')(dbname, {});
// exec
var row = db.exec(`drop table if exists milk;
create table milk (id integer,qty integer,d text,t text);
insert into milk values(1,120,'2023-09-10','09:00');
insert into milk values(1,120,'2023-09-09','09:00');
insert into milk values(1,120,'2023-09-08','09:00');
insert into milk values(1,120,'2023-09-07','09:00');
insert into milk values(1,120,'2023-09-06','09:00');
insert into milk values(1,120,'2023-09-05','09:00');
insert into milk values(1,120,'2023-09-04','09:00');
insert into milk values(1,120,'2023-09-04','09:00');
	`)
// query
var rs = db.prepare('select d,sum(qty) as q from milk group by d order by d asc').all()
const labels = rs.map((value)=>value.d)
const qtys = rs.map((value)=>value.q)
check(labels,['2023-09-04','2023-09-05','2023-09-06','2023-09-07','2023-09-08','2023-09-09','2023-09-10'])
check(qtys,[240,120,120,120,120,120,120])
var row = db.prepare('select d,sum(qty) as total from milk group by d order by d asc').get()
check(row,{d:"2023-09-04",total:240})
