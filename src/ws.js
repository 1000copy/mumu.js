const fs = require('fs');
const http = require('http');
const path = require('path');
var Todo = require('../src/todo')
var Project = require('../src/project')
var Milk = require('../src/milk')
// var JsonFile = require("../lib/jsonfile")
var jd = require('../lib/dispatch')

const port =  process.env.PORT || 3000;
const directoryName = './public';

const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',
  xml: 'application/xml',
};

const root = path.normalize(path.resolve(directoryName));
async function parserjson(req){
   return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("error", (error) => {
      reject(error)
    });
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks);
      var json = JSON.parse(data)
      resolve(json)
    });
   })
}
function static(req,res){
  const extension = path.extname(req.url).slice(1);
  const type = extension ? types[extension] : types.html;
  const supportedExtension = Boolean(type);

  if (!supportedExtension) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  let fileName = req.url;
  
  if (req.url === '/') fileName = 'index.html';
  else if (!extension) {
    try {
      fs.accessSync(path.join(root, req.url + '.html'), fs.constants.F_OK);
      fileName = req.url + '.html';
    } catch (e) {
      fileName = path.join(req.url, 'index.html');
    }
  }

  const filePath = path.join(root, fileName);
  const isPathUnderRoot = path
    .normalize(path.resolve(filePath))
    .startsWith(root);

  if (!isPathUnderRoot) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404: File not found');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404: File not found');
    } else {
      res.writeHead(200, { 'Content-Type': type });
      res.end(data);
    }
  });
}
var jd;
const server = http.createServer(async(req, res) => {
  console.log(`${req.method} ${req.url}`);
  if(req.url == "/" || req.url == "/index.html"){
      res.writeHead(301, {
        // Location: `/vanilla/`
        Location: `/wbct`
      }).end();
  }
  if(req.url == '/echo'){
    var json = await parserjson(req)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({data:json}));
    console.log(`req:${JSON.stringify(json)},res:${JSON.stringify(json)}`)
    return 
  }
  if(req.url == '/api'){
    var json = await parserjson(req)
    var result = await jd.dispatch(json)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    console.log(`req:${JSON.stringify(json)},res:${JSON.stringify(result)}`)
    return 
  }
  static(req,res)
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    // var jsonfile = new JsonFile('./db/todo.json')
    const DBNAME = "./db/DB.s3"
    var dbinit = require("../lib/db").dbinit
    dbinit(DBNAME,"./sql/create.sql")
    const db = require('better-sqlite3')(DBNAME, {});
    var todo = new Todo(db)
    // todo.init()
    jd.register('todo',todo)
    var project = new Project(db)
    jd.register('project',project)
    var milk = new Milk(db)
    // todo.init()
    jd.register('milk',milk)    
});
