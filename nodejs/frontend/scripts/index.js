class GUI {
    constructor() {
        this.url = "http://127.0.0.1:3002/survey"
        this.output = document.querySelector("#output");
        this.first = null;
        this.again = document.getElementById("voteAgain");
        this.interval = null;
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
        for (let { key, votes } of list) {
            let qtt = votes + ((votes === 1) ? " vote" : " votes");
            let perc = (total === 0) ? 0 : (votes / total);
            let percStr = Intl.NumberFormat('pt-br', { style: 'percent' }).format(perc);
            out += `<tr><td>${key}</td><td><meter min="0" max="1" value="${perc}">&nbsp;</meter></td><td>${percStr}</td><td>${qtt}</td></tr>`;
        }
        this.output.tBodies[0].innerHTML = out;
        document.getElementById("total").innerHTML = total;
        this.showTable(true);
        this.again.focus();
    }
    sendData(formData) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        window.fetch(this.url, { method: 'post', headers: myHeaders, body: JSON.stringify(Object.fromEntries(formData)) }).then(resolve => resolve.json()).then(resolve => this.printVotes(resolve)).catch(error => console.log(error));
    }
    validate(evt) {
        evt.preventDefault();
        let input = document.querySelector("input[type='radio']:checked");
        if (input !== null) {
            this.sendData(new FormData(document.forms[0]));
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
        this.first.focus();
    }
    showResults() {
        window.fetch(this.url).then(resolve => resolve.json()).then(resolve => this.printVotes(resolve)).catch(error => console.log(error));
    }
    populateOptions(items) {
        let input = document.querySelector("#input ul");
        let lii = "";
        for (let item of items) {
            lii += `<li><input type="radio" id="key" name="key" value="${item.key}" /> ${item.key}</li>`;
        }
        input.innerHTML = lii;
        this.first = document.querySelector("#input li:first-child input");
        this.first.focus();
    }
    getKeys() {
        window.fetch(this.url).then(resolve => resolve.json()).then(resolve => this.populateOptions(resolve)).catch(error => console.log(error));
    }
    showSettings() {
        let dialog = document.querySelector("dialog");
        dialog.showModal();
        clearInterval(this.interval);
    }
    hideSettings() {
        let dialog = document.querySelector("dialog");
        dialog.close();
        this.first.focus();
        let checkbox = document.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            let time = document.querySelector("#time");
            let t = parseInt(time.value);
            if (t > 0) {
                this.interval = setInterval(this.vote.bind(this), t * 1000);
                this.showTable(true);
            }
        }
    }
    vote() {
        let options = document.querySelectorAll("input[name='key']");
        let key = Math.floor(Math.random() * options.length);
        let fd = new FormData();
        fd.append("key", options[key].value);
        this.sendData(fd);
    }
    automaticVote(evt) {
        let checkbox = evt.target;
        if (checkbox.checked) {
            let time = document.querySelector("#time");
            let t = parseInt(time.value);
            if (t > 0) {
                this.interval = setInterval(this.vote.bind(this), t * 1000);
            }
        } else {
            clearInterval(this.interval);
        }
    }
    registerEvents() {
        let form = document.forms[0];
        form.onsubmit = this.validate.bind(this);
        this.again.onclick = this.voteAgain.bind(this);
        let results = document.getElementById("results");
        results.onclick = this.showResults.bind(this);
        let settings = document.querySelector("#settings");
        settings.onclick = this.showSettings.bind(this);
        let close = document.querySelector("dialog img");
        close.onclick = this.hideSettings.bind(this);
        this.output.className = "hide";
        this.getKeys();
    }
}
let gui = new GUI();
gui.registerEvents();