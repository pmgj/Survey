package servlets;

import java.io.IOException;
import java.util.List;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Survey;
import model.Item;

@WebServlet(name = "Survey", urlPatterns = {"/survey"})
@MultipartConfig
public class SurveyServlet extends HttpServlet {

    private static final Survey ENQUETE = new Survey();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Item> colecao = ENQUETE.getVotes();
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().print(JsonbBuilder.create().toJson(colecao));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String key = request.getParameter("key");
        ENQUETE.vote(new Item(key, 0));
        this.doGet(request, response);
    }
}
