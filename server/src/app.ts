import express from "express";
import bodyParser from "body-parser";
import { assign } from "./schedule";
const app = express();
let port = process.env.PORT || 8000;
let results;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/schedule", (req, res) => {
  const { nurses, patients, preferences } = req.body;
  res.send({ status: 202 });
  assign(nurses, patients, preferences).then((found) => (results = found));
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
