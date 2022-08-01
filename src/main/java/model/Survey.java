package model;

import java.util.ArrayList;
import java.util.List;

public class Survey {
    
    private final List<Item> votes = new ArrayList<>();

    public void addItem(String key) {
        votes.add(new Item(key, 0));
    }
    
    public void vote(Item item) {
        Item temp = votes.stream().filter(i -> i.getKey().equals(item.getKey())).findFirst().orElseThrow();
        temp.setVotes(temp.getVotes() + 1);
    }

    public List<Item> getVotes() {
        return votes;
    }

    public int getTotal() {
        return votes.stream().map(i -> i.getVotes()).reduce(0, (subtotal, element) -> subtotal + element).intValue();
    }
}
