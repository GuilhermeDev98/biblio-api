const Books = require("../../src/models/Book");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Books.sync({ force: true });
  },

  down: (queryInterface, Sequelize) => {
    return Books.drop();
  }
};
