class GUI {
    constructor() {
        this.output = document.querySelector("#output");
        this.first = null;
        this.again = document.getElementById("voteAgain");
        this.interval = null;
        this.db = null;
        this.STORE_NAME = "poll";
    }
    showTable(result) {
        if (result) {
            document.getElementById("input").classList.add("hide");
            document.getElementById("input").classList.remove("show");
            this.output.classList.add("show");
            this.output.classList.remove("hide");
        } else {
            document.getElementById("input").classList.add("show");
            document.getElementById("input").classList.remove("hide");
            this.output.classList.add("hide");
            this.output.classList.remove("show");
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
    sendData(value) {
        this.getVotes(value, obj => {
            this.updateVote({ key: obj.key, votes: obj.votes + 1 });
        });
    }
    validate(evt) {
        evt.preventDefault();
        let input = document.querySelector("input[type='radio']:checked");
        if (input !== null) {
            this.sendData(document.forms[0].key.value);
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
    populateOptions(items) {
        let input = document.querySelector("#radios");
        let lii = "";
        for (let [index, item] of items.entries()) {
            lii += `<div class="form-check">
                <input class="form-check-input" type="radio" name="key" id="key${index}" value="${item.key}">
                <label class="form-check-label" for="key${index}">
                ${item.key}
                </label>
            </div>`;
        }
        input.innerHTML = lii;
        this.first = document.querySelector("#radios div:first-child input");
        this.first.focus();
    }
    getKeys() {
        let values = ["C/C++", "Dart", "Go", "Java", "JavaScript", "PHP", "Python"];
        let objs = [];
        for (let v of values) {
            let obj = { key: v, votes: 0 };
            this.insertOption(obj);
            objs.push(obj);
        }
        this.populateOptions(objs);
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
        this.sendData(options[key].value);
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
    databaseUpgrade(e) {
        let stores = e.target.result;
        if (!stores.objectStoreNames.contains(this.STORE_NAME)) {
            stores.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
        }
    }
    requestError(e) {
        console.error("Error", e.target.error);
    }
    updateVote(option) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.put(option);
        request.onsuccess = this.showResults.bind(this);
        request.onerror = this.requestError;
    }
    showResults() {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.getAll();
        request.onsuccess = e => this.printVotes(e.target.result);
        request.onerror = this.requestError;
    }
    listAll() {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.getAll();
        request.onsuccess = e => this.printVotes(e.target.result);
        request.onerror = this.requestError;
    }
    insertOption(option) {
        let transaction = this.db.transaction(this.STORE_NAME, "readwrite");
        let store = transaction.objectStore(this.STORE_NAME);
        store.add(option);
    }
    getVotes(id, func) {
        let transaction = this.db.transaction(this.STORE_NAME, "readonly");
        let store = transaction.objectStore(this.STORE_NAME);
        let request = store.get(id);
        request.onsuccess = e => func(e.target.result);
        request.onerror = this.requestError;
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
        this.output.classList.add("hide");
        let openRequest = window.indexedDB.open(this.STORE_NAME, 1);
        openRequest.onupgradeneeded = this.databaseUpgrade.bind(this);
        openRequest.onerror = this.requestError;
        openRequest.onsuccess = e => {
            this.db = e.target.result;
            this.getKeys();
        };
    }
}
let gui = new GUI();
gui.registerEvents();