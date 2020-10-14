const db = require("../db/db");
const Company = function (company) {
    this.company_name = company.company_name;
    this.phone_number = company.phone_number;
    this.company_emailid = company.company_emailid;
    this.proprietor = company.proprietor;
    this.company_logo = company.company_logo;
    this.bank_account_number = company.bank_account_number;
    this.bank_ifsc_code = company.bank_ifsc_code;
    this.created_date = company.created_date;
};
Company.getAllCompanies = (cb) => {
    var query = `select * from tbl_company`;
    db.query(query, (err, res) => {
        if (err) return err;
        cb(res);
    });
};

Company.insertCompany = (NewCompany, cb) => {
    var query = `INSERT INTO tbl_company SET ?`;
    console.log(NewCompany);
    db.query(query, NewCompany, (err, res) => {
        if (err) return err;
        cb(res);
    });
};

module.exports = Company;
// {
//    getAllCompanies: Company.getAllCompanies,
//    insertCompany:Company.insertCompany,
//};
