const express = require("express");
const router = express.Router();
const appConfig = require("../../config/appConfig");
const userController = require("../controllers/userController");
// const app = express();
module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/users`;
  app.get(`${baseUrl}/allUsers`, userController.getAllUsersData);
};
