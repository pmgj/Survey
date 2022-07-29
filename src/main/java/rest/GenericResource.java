package rest;

import java.util.List;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.MediaType;
import model.Item;
import model.Survey;

@Path("survey")
public class GenericResource {
    
    private static final Survey SURVEY = new Survey();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Item> getVotes() {
        return SURVEY.getVotes();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Item> vote(Item item) {
        SURVEY.vote(item);
        return SURVEY.getVotes();
    }
}
