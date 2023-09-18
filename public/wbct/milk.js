const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        text-align: center;
    }
</style>
<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.css'>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.css"> 

<button id="buttonclear"><i class="fas fa-trash"></i></button>
<span>Current Project</span><span id="select"></span><br/>
<div id="banner">
    <rc-spinner step="30" max="200" min="30" value="120" id="qty"></rc-spinner>
    <button id="buttonadd"><i class="fas fa-plus"></i></button>
</div>
<div id="list">
    <li>li</li>
</div>  
`;
function iso1(dt){
    // const dt = Date.now()
    const yyyy = dt.getFullYear();
    let mm = dt.getMonth() + 1; // month is zero-based
    let dd = dt.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formatted = yyyy + '-' + mm + '-' + dd;
    return formatted
}
function iso2(dt){
    // const dt = Date.now()
    var currentHours = dt.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    var currentMinuts = dt.getMinutes();
    currentMinuts = ("0" + currentMinuts).slice(-2);
    const formatted = currentHours + ':' + currentMinuts
    return formatted
}
import {dispatch} from './dispatch.js'
import './spinner.js'
class Milk extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$list = this._shadowRoot.querySelector("#list")
        this.$qty = this._shadowRoot.querySelector("#qty")
        this.$buttonclear = this._shadowRoot.querySelector("#buttonclear")
        this.$buttonclear.addEventListener("click",async()=>{
            var json = {resource:"milk",action:"clear",params:{}}
            var data = await dispatch(json)
            this.init()
        })
        this._shadowRoot.querySelector("#buttonadd").addEventListener('click',async ()=>{
            var json = {resource:"milk",action:"add",params:{id:+Date.now(),qty:this.$qty.value,d:iso1(new Date()),t:iso2(new Date())}}
            var data = await dispatch(json)
            this.init()
        })
        var json = {resource:"milk",action:"list",params:{}}
        this.init()
    }
    async init(){
        this.$list.innerHTML = ""
        var json = {resource:"milk",action:"list",params:{}}
        var data = await dispatch(json)
        
        for(const k of data){
            var $li = document.createElement("li")
            $li.innerHTML = `${k.qty}ML@${k.t}`
            $li.id = k.id
            this.$list.appendChild($li)    
            $li.addEventListener('click',async(event)=>{
                var json = {resource:"milk",action:"remove",params:{id:event.target.id}}
                var data = await dispatch(json)
                this.init()      
            })
        }
    }
}

window.customElements.define('rc-milk', Milk);