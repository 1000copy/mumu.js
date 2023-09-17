const DBNAME = "./db/DB.s3"
var dbinit = require("../lib/db").dbinit
dbinit(DBNAME,"./sql/create.sql")
const db = require('better-sqlite3')(DBNAME, {});
// id qty d/date t/time
var Milk = require('../src/milk')
var check = require('../lib/check')
check("checking")
var m = new Milk(db)
check([],m.list())
var id = +new Date()
m.add({id,qty:120,d:"2023-09-10",t:"09:00"})
check([{id,qty:120,d:"2023-09-10",t:"09:00"}],m.list())
m.remove({id})
check([],m.list())
m.add({id:id+1,qty:120,d:"2023-09-10",t:"09:00"})
m.clear()
check([],m.list())
