const CompanySchema = require("../models/Company");
const { get } = require("request");

let getAllCompaniesData = (req, res) => {
    CompanySchema.getAllCompanies((result) => {
    if (result) {
      //   console.log(result);
      res.send(result);
    }
  });
};

module.exports = {
    getAllCompaniesData: getAllCompaniesData,
};
