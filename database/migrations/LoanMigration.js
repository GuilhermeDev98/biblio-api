const Loan = require("../../src/models/Loan");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Loan.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    return Loan.drop();
  }
};
