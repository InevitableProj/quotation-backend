const db = require("../db/db");

let getAllUsers = (cb) => {
  var query = `select * from quotation_users`;
  db.query(query, (err, res) => {
    if (err) return err;
    cb(res);
  });
};

module.exports = {
  getAllUsers: getAllUsers,
};
