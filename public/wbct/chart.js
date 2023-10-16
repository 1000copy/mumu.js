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
<div><canvas id="myChart"></canvas></div>

`;
import {dispatch} from './dispatch.js'
import "https://cdn.jsdelivr.net/npm/chart.js"
class Chart1 extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        // this.$p = this._shadowRoot.querySelector('#p');
        this.chart()
    }
    async chart(){
        const ctx = this._shadowRoot.getElementById('myChart');
        // const data = {
        // 		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        // 		datasets: [{
        // 			label: '# of Votes',
        // 			data: [12, 19, 3, 5, 2, 3],
        // 			borderWidth: 1
        // 		}]
        // }
        // const myChart = new Chart(ctx, {type:'bar',data});
        var json = {resource:"milk",action:"chart",params:{}}
        var data = await dispatch(json)
        const myChart = new Chart(ctx, {type:'bar',data});
    }
    
}

window.customElements.define('rc-chart', Chart1);