const UserSchema = require("../models/User");
const { get } = require("request");

let getAllUsersData = (req, res) => {
  UserSchema.getAllUsers((result) => {
    if (result) {
      //   console.log(result);
      res.send(result);
    }
  });
};

module.exports = {
  getAllUsersData: getAllUsersData,
};
