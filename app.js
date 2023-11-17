const express = require("express");
const routerApi = require("./routes/api.js");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("", routerApi);

module.exports = app;
