const express = require("express");
const routerApi = require("./routes/api.js");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("", routerApi);

module.exports = app;
