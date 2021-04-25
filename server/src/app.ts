import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3430;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/schedule", (req, res) => {
  const { nurses, patients, preferences } = req.body;
  const result =
});

app.listen(port, () => {
  console.log(`Server started and listening on port:${port}`);
});
