require('dotenv').config();

const express = require('express');
const app = express();

// ROOT-LEVEL LOGGER (must be BEFORE all routes)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve index.html for "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve static assets from /public
app.use("/public", express.static(__dirname + "/public"));

// JSON route that respects MESSAGE_STYLE env var
app.get("/json", (req, res) => {
  let msg = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    msg = msg.toUpperCase();
  }
  res.json({ message: msg });
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, function (req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get('/name', (req, res) => {
  const first = req.query.first || '';
  const last  = req.query.last  || '';
  res.json({ name: `${first} ${last}`.trim() });
});

module.exports = app;
