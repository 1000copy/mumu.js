export default new class{
		get template(){
			return `
			<input type="text" placeholder="project name here" id="text"></input>
			<button id="buttonadd" ><i class="fas fa-plus"></i></button>
			<div id="list">
				<li>li</li>
			</div>	`
		}
		mount(){
			var e = document.querySelector("#buttonadd")
			e.addEventListener("click",()=>{
				this.add()
			})
		}
		async add(){
			var value = document.getElementById('text').value
			var json = {resource:"project",action:"add",params:{id:Date.now(),name:value}}
			var data = await dodispatch(json)
		  	this.list()
		  	document.getElementById('text').value = ""
		}
		// params {id,name}
		async remove (params){
			var json = {resource:"project",action:"remove",params}
			try{
				var data = await dodispatch(json)	
				this.list()
			}catch(e){
				alert(e.message)
			}
		}
		async list(){
			var json = {resource:"project",action:"list",params:{}}
			var data = await dodispatch(json)
			var elementid = "list"
			var options = data
			var m = []
			for (var i = 0; i < options.length; i += 1){
				var checked = options[i].checked?"checked":""
				// var jj = JSON.stringify(options[i])
				// jj = jj.replace(/(\r\n|\n|\r)/gm, "")
				// jj = jj.replaceAll(`"`,`'`)
				// console.log(jj)
		    m[i] = `
		            <div><i id= "id${options[i].id}"  class="fas fa-square-minus"></i></div>
			        <div>${options[i].name}</div>
		        	<div></div>
		        `;
		    // console.log(m[i])
		    }
			document.getElementById(elementid).innerHTML = `<div class="grid-container id="container">`+ m.join("") +`</div>`
			for (var i = 0; i < options.length; i += 1){
				var a = options[i]
				document.querySelector(`#id${options[i].id}`).addEventListener('click',()=>{
					this.remove(a)
				})
			}
		}
	}()