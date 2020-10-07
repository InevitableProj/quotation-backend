const db = require("../db/db");
const Company = function (company) {
    this.Name = company.Name;
    this.PhoneNumber = company.PhoneNumber;
    this.EmailId = company.EmailId;
    this.PropritorName = company.PropritorName;
    this.Logo = company.Logo;
    this.AccountNo = company.AccountNo;
    this.AccountIFC = company.AccountIFC;
};
Company.getAllCompanies = (cb) => {
    var query = `select * from tbl_companyinfo`;
    db.query(query, (err, res) => {
        if (err) return err;
        cb(res);
    });
};

module.exports = {
    getAllCompanies: Company.getAllCompanies,
};
