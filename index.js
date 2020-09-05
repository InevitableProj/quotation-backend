const http = require("http");
const app = require("express")();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");
const appConfig = require("./config/appConfig");
const mysql = require("mysql");
//require dotenv module to fetch data
require("dotenv").config();

//initialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

const server = http.createServer();
server.listen(process.env.PORT);
console.log("onerror1");
server.on("error", onError);
console.log("onlisten");
server.on("listening", onListening);

function onError(error) {
  console.log("onerror", error);
  if (error.syscall !== "listen") {
    console.log(error.code);
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.log(
        `${error.code} :elavated privileges require, serverOnErrorHandler`
      );
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(
        `${error.code} : port is already in use., serverOnErrorHandler`
      );
      process.exit(1);
      break;
    default:
      console.log(
        `${error.code}:some unknown error occured,serverOnErrorHandler`
      );
      throw error;
  }
}

function onListening() {
  console.log("server listening");
  //   console.log(server);
  var addr = server.address();
  console.log("address", addr);
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  "Listening on " + bind;
  console.log(bind);
  let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  db.connect((err) => {
    if (err) {
      console.log("error while connect", err);
      throw err;
    }
    console.log("Database connected");
    db.query(`select * from quotation_users`, (err, res) => {
      err ? console.log(err) : console.log(res);
    });
  });
}

process.on("unhandledRejection", (reason, p) =>
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason)
);

// db.on("error", function (err) {
//   console.log("database connection error");
//   console.log(err);
// });

// db.on("open", function (err) {
//   if (err) {
//     console.log("database error");
//     console.log(err);
//   } else {
//     console.log("database connection open success");
//   }
// });
