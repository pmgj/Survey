import express from 'express';
import cors from 'cors';
import Survey from './Survey.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 3002;
const survey = new Survey();
app.listen(PORT, () => {
    console.log("Server Listening on PORT: ", PORT);
    let disc = ["C/C++", "Dart", "Go", "Java", "JavaScript", "PHP", "Python"];
    disc.forEach(d => survey.addItem(d));
});

app.get("/survey", (_, res) => {
    res.send(survey.getVotes());
});

app.post("/survey", (req, res) => {
    survey.vote(req.body);
    res.send(survey.getVotes());
});
