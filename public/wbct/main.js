const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    }

    button {
    border: none;
    cursor: pointer;
    }

    ul {
    list-style: none;
    padding: 0;
    }
</style>
<input id="i" type="text" placeholder="0"></input>
<button id="p">+</button>
<button id="d">-</button>
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