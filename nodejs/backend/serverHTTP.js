import { createServer } from 'node:http';

const server = createServer((req, res) => {

    // Informar dados individualmente
    // res.statusCode = 200;
    // res.statusMessage = "Tudo certo!";
    // res.setHeader("Content-Type", "text/plain");
    
    // Informar os dados em conjunto
    res.writeHead(200, "Write Head", { 'Content-Type': 'text/plain' });
    
    res.end("Hello World!");

    // if (req.method === "POST") {
    //     let payload = "";
    //     req.on("data", chunk => payload += chunk.toString());
    //     req.on("end", () => {
    //         res.writeHead(200, { 'Content-Type': 'text/plain' });
    //         res.end(payload);
    //     });
    // } else {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end('Hello World!\n');
    // }
});

server.listen(3002, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3002');
});