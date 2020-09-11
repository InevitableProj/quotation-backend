const http = require("http");
const app = require("express")();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");
const appConfig = require("./config/appConfig");
const routeLoggerMiddleware = require("./app/middlewares/routeLogger.js");
const connection = require("./app/db/db");
//require dotenv module to fetch data
require("dotenv").config();

//initialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routeLoggerMiddleware.logIp);

// const controllersPath = "./app/controllers";
const routesPath = "./app/routes";

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf(".js")) {
    let route = require(routesPath + "/" + file);
    route.setRouter(app);
  }
});

const server = http.createServer(app);
server.listen(process.env.PORT);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    console.log(error.code);
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.log(
        `${error.code} :elevated privileges require, serverOnErrorHandler`
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
        `${error.code}:some unknown error occurred,serverOnErrorHandler`
      );
      throw error;
  }
}

function onListening() {
  console.log("server listening");
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  "Listening on " + bind;
  connection.connect((err) => {
    if (err) {
      console.log("error while connect", err);
      throw err;
    }
    console.log("Database connected");
    // db.query(`select * from quotation_users`, (err, res) => {
    //   err ? console.log(err) : console.log(res);
    // });
  });
}

process.on("unhandledRejection", (reason, p) =>
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason)
);

// connection.on("error", function (err) {
//   console.log("database connection error");
//   console.log(err);
// });

// connection.on("open", function (err) {
//   if (err) {
//     console.log("database error");
//     console.log(err);
//   } else {
//     console.log("database connection open success");
//   }
// });
