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
    <rc-spinner step="30" max="200" min="30" value="120">
    <button id="buttonadd"><i class="fas fa-plus"></i></button>
</div>
<div id="list">
    <li>li</li>
</div>  
`;
import {dispatch} from './dispatch.js'
import './spinner.js'
class Milk extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$list = this._shadowRoot.querySelector("#list")
        var json = {resource:"milk",action:"list",params:{}}
        this.init()
    }
    async init(){
        var json = {resource:"milk",action:"list",params:{}}
        var data = await dispatch(json)
        
        for(const k of data){
            var $li = document.createElement("li")
            $li.innerHTML = `${k.qty}ML@${k.t}`
            this.$list.appendChild($li)    
        }
    }
}

window.customElements.define('rc-milk', Milk);