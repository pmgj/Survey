import Type from "./Type.js";

class GUI {
    constructor() {
        this.type = Type.XHR;
        this.output = document.querySelector("#output");
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
    printVotes(list) {
        let total = list.reduce((a, b) => a + b.votes, 0);
        let out = "";
        for (let {key, votes} of list) {
            let qtt = votes + ((votes === 1) ? " vote" : " votes");
            let perc = (total === 0) ? 0 : (votes / total);
            let percStr = Intl.NumberFormat('pt-br', { style: 'percent' }).format(perc);
            out += `<tr><td>${key}</td><td><meter min="0" max="1" value="${perc}">&nbsp;</meter></td><td>${percStr}</td><td>${qtt}</td></tr>`;
        }
        this.output.tBodies[0].innerHTML = out;
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
        let input = document.querySelector("#input ul");
        let lii = "";
        for (let item of items) {
            lii += `<li><input type="radio" name="key" value="${item.key}" /> ${item.key}</li>`;
        }
        input.innerHTML = lii;
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