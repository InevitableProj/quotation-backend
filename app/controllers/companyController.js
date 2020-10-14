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

let addCompanyData = (req, res) => {

  var datetime = new Date();
  const Company = new CompanySchema({
    company_name : req.body.company_name,
    phone_number : req.body.phone_number,
    company_emailid : req.body.company_emailid,
    proprietor : req.body.proprietor,
    company_logo : req.body.company_logo,
    bank_account_number : req.body.bank_account_number,
    bank_ifsc_code : req.body.bank_ifsc_code,
    created_date: datetime
  });

  CompanySchema.insertCompany(Company,(result) => {
  if (result) {
    //   console.log(result);
    res.send(result);
  }
});
};

module.exports = {
  getAllCompaniesData: getAllCompaniesData,
  addCompanyData: addCompanyData,
};
