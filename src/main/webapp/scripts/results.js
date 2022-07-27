import Type from "./Type.js";

class PollResult {
    constructor() {
        this.type = Type.FETCH;
    }
    stateChanged(votes) {
        let total = votes.reduce((a, b) => a + b.votes, 0);
        let output = document.getElementById("output");
        for (let i = 0; i < votes.length; i++) {
            let vote = votes[i].votes;
            let li = output.getElementsByTagName("li").item(i);
            let spans = li.getElementsByTagName("span");
            spans[0].innerHTML = vote + ((vote === 1) ? " vote" : " votes");
            let meter = li.getElementsByTagName("meter")[0];
            let perc = (total === 0) ? 0 : (vote / total);
            meter.value = perc;
            spans[1].innerHTML = Intl.NumberFormat('pt-br', { style: 'percent' }).format(perc);
        }
        document.getElementById("total").innerHTML = total;
        this.getResults();
    }
    getResults() {
        if (this.type === Type.FETCH) {
            window.fetch(`survey`).then(resolve => resolve.json()).then(resolve => this.stateChanged(resolve)).catch(error => console.log(error));
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => stateChanged(JSON.parse(xhr.responseText));
            xhr.open("get", "survey");
            xhr.send();
        }
    }
    showResults(items) {
        let ulOutput = document.querySelector("#output ul");
        let lio = "";
        for (let item of items) {
            lio += `<li>${item.key} &ndash; <span class="voto">0 votos</span><br />
                        <meter min="0" max="1" value="0">&nbsp;</meter> <span class="percent">0 %</span>
                    </li>`;
        }
        ulOutput.innerHTML = lio;
        this.getResults();
    }
    getKeys() {
        if (this.type === Type.FETCH) {
            window.fetch(`survey`).then(resolve => resolve.json()).then(items => this.showResults(items)).catch(error => console.log(error));
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => this.showResults(JSON.parse(xhr.responseText));
            xhr.open("get", "survey");
            xhr.send();
        }
    }
}
let poll = new PollResult();
poll.getKeys();