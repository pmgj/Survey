export default class Item {
    constructor(key, votes) {
        this.key = key;
        this.votes = votes;
    }
    key() {
        return this.key;
    }
    votes() {
        return this.votes;
    }
    addVote() {
        this.votes++;
    }
}