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
<h3>about1 by Reco</h3>
<p>Interest Points are</p>
<ul>
    <li>web components</li>
    <textarea disabled> <link rel="manifest" href="manifest.json" /> </textarea>
</ul>
`;

class About1 extends HTMLElement {
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
        this.dispatchEvent(new CustomEvent('change', { detail: v }));
    }
     static get observedAttributes() {
        return ['min', 'max','step','value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'min':
                this._min = +newValue;
                break;
        }
    }
}

window.customElements.define('rc-about1', About1);