//Requiring all needed modules
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const app = express();
require("dotenv").config();

////////////////////////////////////////
const PORT=process.env.PORT || 4000;
const server = https
  .createServer( {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
  )
  .listen(PORT, function () {
    console.log("Go to https://localhost:"+PORT);
  });
const io = require("socket.io")(server);
var sockets = [];
//require("./notifications/main")(io);
module.exports.sockets = sockets;
module.exports.io = io;
//////////////////////////////////////////

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require("./api/api");
const controller = require("./controller/controller");

app.use(function (req, res, next) {
  res.io = io;
  next();
});

app.use("/api", api);
app.use("/", controller);

//////////////////////////////////////////////////
const nots = require("./controller/notifications");
app.use("/notification", nots);

//console.log(array);

////////////////////////////////////////////////////
app.use("/", express.static(__dirname + "/client/"));