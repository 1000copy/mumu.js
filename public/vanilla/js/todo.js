export default new class{
		get template(){
			var b = `<button id="buttonclear"><i class="fas fa-trash"></i></button>`
			return `<span>Current Project</span><span id="select"></span><br/>
		<div id="banner">
			<input type="text" placeholder="subject here" id="text"/>
			<button id="buttonadd"><i class="fas fa-plus"></i></button>
		</div>
		<div id="list">
			<li>li</li>
		</div>	`;
		}
		async mount(){
			document.querySelector(`#buttonadd`).addEventListener('click',()=>{
				this.add()
			})
			// document.querySelector(`#buttonclear`).addEventListener('click',()=>{
			// 	this.clear1()
			// })
			var p1 = await dodispatch({resource:"project",action:"list",params:{}})
			var p2 = p1.map(x=>`<option value="${x.id}">${x.name}</option>`)
			document.getElementById("select").innerHTML = 
			`<select id="ps" >${p2.join()}</select>`
			// console.log(item)
			// TODO : remove event listener when ?
			document.getElementById("ps").addEventListener("change",()=>{
				this.list()
			})
		  	this.list()
		}
		async add(){
			var value = document.getElementById('text').value
			var pid = document.getElementById('ps').value
			var json = {resource:"todo",action:"add",params:{id:Date.now(),subject:value,pid}}
			var data = await dodispatch(json)
	  	this.list()
	  	document.getElementById('text').value = ""
		  	// document.getElementById("container").append("<button>acdkdkdkk</button")
		}
		async docheck (id,checked){
			// var value = document.getElementById('text').value
			// let checked = document.getElementById('checked').value
			var json = {resource:"todo",action:"checked",params:{id,checked}}
			var data = await dodispatch(json)
		  this.list()
		}
		onchange(){
			this.list()
		}
		async remove (id){
			var json = {resource:"todo",action:"remove",params:{id:id}}
			var data = await dodispatch(json)
			this.list()
		}
		async clear1 (){
			// alert(12)
			var json = {resource:"todo",action:"clear",params:{}}
			var data = await dodispatch(json)
			this.list()
		}	
		async list(){
			var pid = document.getElementById('ps').value
			var json = {resource:"todo",action:"list",params:{pid}}
			var data = await dodispatch(json)
			// await dolist("list",data)
			var elementid = "list"
			var options = data
			var m = []
			for (var i = 0; i < options.length; i += 1){
				var checked = options[i].checked?"checked":""
		        m[i] = `
		            <div><i id="i${options[i].id}"  class="fas fa-square-minus"></i></div>
			        <div><input id="c${options[i].id}" type="checkbox"  ${checked}/></div>
			        <div>${options[i].subject}</div>
		        
		        `;
		    }
			document.getElementById(elementid).innerHTML = `<div class="grid-container id="container">`+ m.join("") +`</div>`
			for (var i = 0; i < options.length; i += 1){
				var a = options[i]
				document.querySelector(`#i${a.id}`).addEventListener('click',()=>{
					this.remove(a.id)
				})
				var id = `#c${a.id}`
				var e = document.querySelector(id)
				var checked = e.checked
				e.addEventListener('click',(sender)=>{
					var e = sender.target
					var checked = e.checked
					console.log(e,e.id.substring(1),!e.checked)
					this.docheck(e.id.substring(1),!e.checked)
				})
			}
		}
	}()