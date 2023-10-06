//<button id="buttonclear"><i class="fas fa-trash"></i></button>
const template = document.createElement('template');
template.innerHTML = `
<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.css'>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.css"> 
<style>
    :host {
        display:inline-block !important;
        text-align: center;
    }
    #iadd{
        color: #ff0000;
    }
    button.remove{
        padding-left:8px !important;
        padding-right:8px !important;
    }
    div{
        display:block;
     }
    input#date{
       display:inline-block !important;
    }
</style>
<div id="banner">
    <span>Date</span>
    
    <input id= "date" type="date"></input></div>
    <rc-spinner step="30" max="200" min="30" value="120" id="qty"></rc-spinner>
    <button id="buttonadd"><i class="fas fa-plus" id="iadd"></i></button>

<div id="list">
    <li>li</li>
</div>  
<span>Total:</span><span id="total">0</span><span>ML</span>
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
        this.$total = this._shadowRoot.getElementById('total')
        this.$date = this._shadowRoot.getElementById('date')
        this.$date.valueAsDate = new Date();
        this.$date.addEventListener("change",async()=>{
            this.init()
        })
        this.$list = this._shadowRoot.querySelector("#list")
        this.$qty = this._shadowRoot.querySelector("#qty")
        // this.$buttonclear = this._shadowRoot.querySelector("#buttonclear")
        // this.$buttonclear.addEventListener("click",async()=>{
        //     var json = {resource:"milk",action:"clear",params:{}}
        //     var data = await dispatch(json)
        //     this.init()
        // })
        this._shadowRoot.querySelector("#buttonadd").addEventListener('click',async ()=>{
            var json = {resource:"milk",action:"add",params:{id:+Date.now(),qty:this.$qty.value,d:iso1(this.$date.valueAsDate),t:iso2(new Date())}}
            var data = await dispatch(json)
            this.init()
        })
        var json = {resource:"milk",action:"list",params:{}}
        this.init()
    }
    async init(){
        this.$total.innerHTML = "loading..."
        var json = {resource:"milk",action:"total",params:{date:iso1(this.$date.valueAsDate)}}
        var data = await dispatch(json)
        this.$total.innerHTML = data.total
        this.$list.innerHTML = ""
        var json = {resource:"milk",action:"list",params:{date:iso1(this.$date.valueAsDate)}}
        var data = await dispatch(json)
        
        for(const k of data){
            var $li = document.createElement("li")
            $li.innerHTML = `${k.qty}ML@${k.t}<button class="remove"><i class="fas fa-remove"></i></button>`
            // $li.id = k.id
            this.$list.appendChild($li)    
            // querySelector可以在当前node上下文查询节点，而不是非要在root上，这个很方便的
            var $b = $li.querySelector('button')
            // console.log($b)
            $b.id = k.id
            $b.addEventListener('click',async(event)=>{
                console.log(event.target,event.target.parentNode)
                // 无论点击到i上，还是button上，都可以获得milk.id
                var json = {resource:"milk",action:"remove",params:{id:event.target.id || event.target.parentNode.id}}
                var data = await dispatch(json)
                this.init()      
            })
        }
    }
}

window.customElements.define('rc-milk', Milk);