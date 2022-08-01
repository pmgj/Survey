package rest;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
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

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public void vote(@FormParam("key") String key, @Context HttpServletRequest request,
            @Context HttpServletResponse response) throws IOException, ServletException {
        Survey survey = (Survey) request.getServletContext().getAttribute("data");
        survey.vote(new Item(key, 0));
        request.getRequestDispatcher("/results.jsp").forward(request, response);
    }
}
