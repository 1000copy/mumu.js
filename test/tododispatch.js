(async ()=>{
    var jd = require('dispatch')
    var check = require("check")
    class Obj1{
        action1(){
            result = "action1 of obj1 is here"
            return result;
        }
        action2(params){
            return params;
        }
    }
    jd.register('obj1',new Obj1())
    var result = await jd.dispatch({resource:"obj1",action:"action1",params:{}})
    check( "action1 of obj1 is here",result.data,"failure of obj1.action1 dispatch")
    var result = await jd.dispatch({resource:"obj1",action:"action2",params:{id:1}})
    check( {id:1},result.data,"failure of obj1.action2 dispatch")

    var Todo = require('../src/todo')
    var check = require("check")
    var JsonFile = require("jsonfile")
    var jsonfile = new JsonFile('./db/todo.json')
    var todo = new Todo(jsonfile)
    jd.register('todo',todo)
    await jd.dispatch({resource:"todo",action:"add",params:{id:1,subject:"todo 1"}})
    // await todo.add({id:1,subject:"todo 1"})
    // return 
    check(await todo.reload(),[{id:1,subject:"todo 1"}],'reload failure',true)
    await jd.dispatch({resource:"todo",action:"remove",params:{id:1}})
    // check(await todo.remove({id:1}),{id:1},'todo.remove failure',true)
    check(await todo.reload(),[],'reload failure',true)
    await todo.clear()
    check(await todo.reload(),[],'reload failure',true)
    check("OK")
})()