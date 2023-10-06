const template = document.createElement('template');
template.innerHTML = `
<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.css'>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.css"> 
<style>
    :host {
        display:inline-block !important;
        text-align: center;
        padding:0px !important;
    }
    button {
    border: none;
    cursor: pointer;
    padding:5px !important;
    }
    input{
        display:inline-block !important;
    }
    button{
        display:inline-block;
    }
    ul {
    list-style: none;
    padding: 0;
    }
</style>
<div>
<span>Qty(ml)</span>
    <input id="i" type="text" placeholder="0" size="5"></input>
    <button id="p"><i class="fas fa-arrow-up"></i></button>
    <button id="d"><i class="fas fa-arrow-down"></i></button>
</div>
`;

class Spinner extends HTMLElement {
    constructor() {
        super();
        this._max = 100
        this._min = 0 
        this._step = 1
        this._value = 0 
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$p = this._shadowRoot.querySelector('#p');
        this.$d = this._shadowRoot.querySelector('#d');
        this.$i = this._shadowRoot.querySelector('#i');
        this.$p.addEventListener('click', (e) => {
            // this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
            this.value+=this._step
        });
        this.$d.addEventListener('click', (e) => {
            this.value-=this._step
        });
    }
    get value(){
        return this._value
    }
    set value(v){
        if(this._value == v)return
        if(v > this._max)return
        if(v < this._min)return
        this._value = v
        this.$i.value = this._value 
        // this.dispatchEvent(new CustomEvent('onchange', { detail: v }));
        // 这里的事件如果是change，那么在 <rc-spinner>内必须写成onchange，加上一个on_的前缀
        this.dispatchEvent(new CustomEvent('change', { detail: v }));
        // 这个方法无法传递detail
        // this.dispatchEvent(new Event('change', { detail: v }));
    }
     static get observedAttributes() {
        return ['min', 'max','step','value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'min':
                this._min = +newValue;
                break;
            case 'max':
                this._max = +newValue;
                break;
            case 'step':
                this._step = +newValue;
                break;                
            case 'value':
                this.value = +newValue;
                break;                
        }
    }
}

window.customElements.define('rc-spinner', Spinner);