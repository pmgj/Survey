package ws;

import java.io.IOException;

import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/survey")
public class SurveyServer {

    private static final int[] votos = new int[8];

    @OnOpen
    public void onOpen(final Session session) {
        System.out.println(session.getId() + " has opened a connection");
    }

    @OnMessage
    public void onMessage(String message, final Session session) {
        System.out.println("Message from " + session.getId() + ": " + message);
        int index = Integer.parseInt(message);
        if (index != -1) {
            votos[index]++;
        }
        System.out.println("Número de sessões abertas: " + session.getOpenSessions().size());
        try {
            for (Session s : session.getOpenSessions()) {
                if (s.isOpen()) {
                    s.getBasicRemote().sendText(this.listaVotos());
                }
            }
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("Session " + session.getId() + " has ended");
    }

    private String listaVotos() {
        return JsonbBuilder.create().toJson(votos);
    }
}
