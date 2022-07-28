class Robot {
    constructor() {
        this.dot = 0;
        this.t = null;
        this.options = null;
        this.option = document.getElementById("vote");
        this.STOP = "Stop";
    }
    voting() {
        let opt = this.option.value;
        let msg = document.getElementById("message");
        if (opt === this.STOP) {
            let str = "Voting";
            str += (this.dot % 3 === 0) ? "." : (this.dot % 3 === 1) ? ".." : "...";
            msg.innerHTML = str;
            this.dot++;
        } else {
            this.dot = 0;
            msg.innerHTML = "";
        }
    }
    getKeys() {
        window.fetch(`survey`).then(resolve => resolve.json()).then(resolve => this.options = resolve.map(i => i.key)).catch(error => console.log(error));
    }
    vote() {
        let opcao = this.option.value;
        if (opcao !== "Vote") {
            let key = Math.floor(Math.random() * this.options.length);
            let fd = new FormData();
            fd.append("key", this.options[key]);
            window.fetch(`survey`, { method: 'post', body: fd });
        }
    }
    execute() {
        let opcao = this.option.value;
        if (opcao === this.STOP) {
            this.option.value = "Vote";
            clearInterval(this.t);
        } else {
            this.option.value = this.STOP;
            this.vote();
            let voto = document.getElementById("time").value;
            this.t = setInterval(this.vote.bind(this), parseInt(voto) * 1000);
        }
    }
    registerEvents() {
        this.option.onclick = this.execute.bind(this);
        this.getKeys();
        setInterval(this.voting.bind(this), 1000);
    }
}
let robot = new Robot();
robot.registerEvents();