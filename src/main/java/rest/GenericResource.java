package rest;

import java.util.List;

import jakarta.servlet.ServletContext;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import model.Item;
import model.Survey;

@Path("survey")
public class GenericResource {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Item> getVotes(@Context ServletContext context) {
        Survey survey = (Survey) context.getAttribute("data");
        return survey.getVotes();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Item> vote(Item item, @Context ServletContext context) {
        Survey survey = (Survey) context.getAttribute("data");
        survey.vote(item);
        return survey.getVotes();
    }
}
