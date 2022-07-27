import Type from "./Type.js";

class GUI {
    constructor() {
        this.type = Type.XHR;
        this.output = document.getElementById("output");
    }
    showTable(result) {
        if (result) {
            document.getElementById("input").className = "hide";
            this.output.className = "show";
        } else {
            document.getElementById("input").className = "show";
            this.output.className = "hide";
        }
    }
    printVotes(votes) {
        let total = votes.reduce((a, b) => a + b.votes, 0);
        for (let i = 0; i < votes.length; i++) {
            let vote = votes[i].votes;
            let li = this.output.getElementsByTagName("li").item(i);
            let spans = li.getElementsByTagName("span");
            spans[0].innerHTML = vote + ((vote === 1) ? " vote" : " votes");
            let meter = li.querySelector("meter");
            let perc = (total === 0) ? 0 : (vote / total);
            meter.value = perc;
            spans[1].innerHTML = Intl.NumberFormat('pt-br', { style: 'percent' }).format(perc);
        }
        document.getElementById("total").innerHTML = total;
        if (total > 0) {
            this.showTable(true);
        } else {
            alert("No stored votes!");
        }
    }
    sendData() {
        if (this.type === Type.FETCH) {
            window.fetch(`survey`, { method: 'post', body: new FormData(document.forms[0]) }).then(resolve => resolve.json()).then(resolve => this.printVotes(resolve)).catch(error => console.log(error));
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => this.printVotes(JSON.parse(xhr.responseText));
            let params = new FormData(document.forms[0]);
            xhr.open("post", "survey");
            xhr.send(params);
        }
    }
    validate(evt) {
        evt.preventDefault();
        let input = document.querySelector("input[type='radio']:checked");
        if (input !== null) {
            this.sendData();
        } else {
            alert("You must choose an option!");
        }
    }
    voteAgain() {
        let radios = document.forms[0].key;
        for (let radio of radios) {
            radio.checked = false;
        }
        this.showTable(false);
    }
    showResults() {
        let total = parseInt(document.getElementById("total").innerHTML);
        if (total > 0) {
            this.showTable(true);
        } else {
            if (this.type === Type.FETCH) {
                window.fetch(`survey`).then(resolve => resolve.json()).then(resolve => this.printVotes(resolve)).catch(error => console.log(error));
            } else {
                let xhr = new XMLHttpRequest();
                xhr.onload = () => this.printVotes(JSON.parse(xhr.responseText));
                xhr.open("get", "survey");
                xhr.send();
            }
        }
    }
    populateOptions(items) {
        let ulInput = document.querySelector("#input ul");
        let ulOutput = document.querySelector("#output ul");
        let lii = "";
        let lio = "";
        for (let item of items) {
            lii += `<li><input type="radio" name="key" value="${item.key}" /> ${item.key}</li>`;
            lio += `<li>${item.key} &ndash; <span class="voto">0 votes</span><br />
                    <meter min="0" max="1" value="0">&nbsp;</meter> <span class="percent">0 %</span>
                </li>`;
        }
        ulInput.innerHTML = lii;
        ulOutput.innerHTML = lio;
    }
    getKeys() {
        if (this.type === Type.FETCH) {
            window.fetch(`survey`).then(resolve => resolve.json()).then(resolve => this.populateOptions(resolve)).catch(error => console.log(error));
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => this.populateOptions(JSON.parse(xhr.responseText));
            xhr.open("get", "survey");
            xhr.send();
        }
    }
    registerEvents() {
        let form = document.forms[0];
        form.onsubmit = this.validate.bind(this);
        let again = document.getElementById("voteAgain");
        again.onclick = this.voteAgain.bind(this);
        let results = document.getElementById("results");
        results.onclick = this.showResults.bind(this);
        this.output.className = "hide";
        this.getKeys();
    }
}
let gui = new GUI();
gui.registerEvents();