const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Model = Sequelize.Model;
const User = require("../models/User");
const Book = require("../models/Book");

class Loan extends Model {}
Loan.init(
  {
    returnDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    returnedIn: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: "loan"
  }
);

Loan.belongsTo(User);
Loan.belongsTo(Book);

module.exports = Loan;
