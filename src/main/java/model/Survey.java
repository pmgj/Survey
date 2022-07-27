package model;

import java.util.ArrayList;
import java.util.List;

public class Survey {
    
    private final List<Item> votes = new ArrayList<>();

    public Survey() {        
        votes.add(new Item("C/C++", 0));
        votes.add(new Item("Dart", 0));
        votes.add(new Item("Go", 0));
        votes.add(new Item("Java", 0));
        votes.add(new Item("JavaScript", 0));
        votes.add(new Item("PHP", 0));
        votes.add(new Item("Python", 0));
    }
    
    public void vote(Item item) {
        Item temp = votes.stream().filter(i -> i.getKey().equals(item.getKey())).findFirst().orElseThrow();
        temp.setVotes(temp.getVotes() + 1);
    }

    public List<Item> getVotes() {
        return votes;
    }
}
