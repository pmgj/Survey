package model;

import java.util.ArrayList;
import java.util.List;

public class Survey {
    
    private final List<Item> votes = new ArrayList<>();

    public void addItem(String key) {
        votes.add(new Item(key, 0));
    }
    
    public void vote(Item item) {
        Item temp = votes.stream().filter(i -> i.key().equals(item.key())).findFirst().orElseThrow();
        Item newItem = new Item(temp.key(), temp.votes() + 1);
        votes.remove(temp);
        votes.add(newItem);
    }

    public List<Item> getVotes() {
        return votes;
    }

    public int getTotal() {
        return votes.stream().map(i -> i.votes()).reduce(0, (subtotal, element) -> subtotal + element).intValue();
    }
}
