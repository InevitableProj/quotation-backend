const express = require("express");
const router = express.Router();
const appConfig = require("../../config/appConfig");
const companyController = require("../controllers/companyController");
// const app = express();
module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/company`;
  app.get(`${baseUrl}/allCompanies`,companyController.getAllCompaniesData);
};
