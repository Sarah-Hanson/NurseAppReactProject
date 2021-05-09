import express from "express";
import bodyParser from "body-parser";
import { assign } from "./schedule";
const app = express();
const port = process.env.PORT || 8000;
let results;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/schedule", (req, res) => {
  const { teams, preferences } = req.body;
  res.send({ status: 202 });
  assign(teams, preferences).then((found) => (results = found)).catch((e) => console.warn(e.message);
});

app.get("/schedule", (req, res) => {
  if (results) {
    res.send(results);
    results = undefined;
  }
  res.send({ status: "pending" });
});

app.post("/echo", (req, res) => {
  console.warn(JSON.stringify(req.body));
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server started and listening on port:${port}`);
});
