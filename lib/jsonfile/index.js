var fs = require('fs/promises')
class JsonFile {
	constructor(file){
		this.file = file 
	}
	async read(){
	  try {
	    let j = await fs.readFile(this.file)
	    return JSON.parse(j)
	  } catch (err) {
	    // console.error('Error occurred while reading json file:', err)
	    // return JSON.stringify([])
	    return []
	  }
	}
	async write(json){
	  try {
	    return await fs.writeFile(this.file,JSON.stringify(json))
	  } catch (err) {
	    console.error('Error occurred while writing json file:', err)
	  }
	}
}
module.exports = JsonFile