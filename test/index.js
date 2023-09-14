// var todo = require("./todo.js")
/*
Node.js has included experimental support for ES6 support. Read more about here: https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling.

TLDR;

Node.js >= v13
*/
var fs = require('fs/promises')
var JsonFile = require('jsonfile')
var check = require('check')
async function listDir() {
  try {
    return await fs.readdir('./')
  } catch (err) {
    console.error('Error occurred while reading directory:', err)
  }
}
async function writefile(json) {
  try {
    return await fs.writeFile('./t.json',JSON.stringify(json))
  } catch (err) {
    console.error('Error occurred while reading directory:', err)
  }
}
async function readfile() {
  try {
    let j = await fs.readFile('./t.json')
    return JSON.parse(j)
  } catch (err) {
    console.error('Error occurred while reading directory:', err)
  }
}
function dirname(){
	const path = require('path');
	var scriptname = __dirname
	var workdir = process.cwd()+"/"
	var p = scriptname.replaceAll(workdir,"")
	// console.log(p);
	// console.log(scriptname);
	// console.log(workdir)
	// console.log(path.basename(process.cwd()))
	return p 
	
}
(async ()=>{
	// var a = await listDir()
	// console.log(a)
	// check(a.length>=0,true)
	var c = await writefile([])
	var b = await readfile()
	// JSON.stringify([])
	// console.log(b)
	check([],b,'json file content is not []',true)
	var j = new JsonFile('./t.json')
	var jj= [{a:1}]
	await j.write(jj)
	var r = await j.read()
	check(jj,r,'json file content is not []',true)
	// await j.clear()
	check("test", await dirname(),"not equal to test of path",true)
})()

