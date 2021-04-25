import express from "express";
import bodyParser from "body-parser";
import { assign } from "./schedule";
const app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/schedule", (req, res) => {
  const { nurses, patients, preferences } = req.body;
  const result = assign(nurses, patients, preferences);
  res.send(result);
});

app.post("/echo", (req, res) => {
  console.warn(JSON.stringify(req.body));
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server started and listening on port:${port}`);
});
