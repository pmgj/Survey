import Item from "./Item.js";

export default class Survey {
    constructor() {
        this.votes = [];
    }

    addItem(key) {
        this.votes.push(new Item(key, 0));
    }

    vote(item) {
        let temp = this.votes.filter(i => i.key === item.key)[0];
        temp.addVote();
    }

    getVotes() {
        return this.votes;
    }

    getTotal() {
        return this.votes.map(i => i.votes).reduce((subtotal, element) => subtotal + element, 0);
    }

}