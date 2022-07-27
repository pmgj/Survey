package model;

public class Item {
    private String key;
    private int votes;

    public Item(String key, int votes) {
        this.key = key;
        this.votes = votes;
    }

    public Item() {
    }
    
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    @Override
    public String toString() {
        return String.format("(%s, %d)", key, votes);
    }
}
