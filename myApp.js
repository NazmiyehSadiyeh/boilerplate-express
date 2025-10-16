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

module.exports = app;
