import { createServer } from 'node:http';
import Survey from './Survey.js';

const survey = new Survey();

const server = createServer((req, res) => {
    if (req.url === '/survey') {
        switch (req.method) {
            case "POST":
                let payload = "";
                req.on("data", chunk => payload += chunk.toString());
                req.on("end", () => {
                    survey.vote(JSON.parse(payload));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(survey.getVotes()));
                });
                break;
            case "GET":
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify(survey.getVotes()));
                break;
            case "OPTIONS":
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'POST' });
                break;
        }
        if (req.method === "POST") {
            let payload = "";
            req.on("data", chunk => payload += chunk.toString());
            req.on("end", () => {
                survey.vote(JSON.parse(payload));
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'POST' });
                res.end(JSON.stringify(survey.getVotes()));
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify(survey.getVotes()));
        }
    }
});

server.listen(3002, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3002');
    let disc = ["C/C++", "Dart", "Go", "Java", "JavaScript", "PHP", "Python"];
    disc.forEach(d => survey.addItem(d));
});