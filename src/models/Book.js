const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Model = Sequelize.Model;

class Book extends Model {}
Book.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    yearOfIssue: {
      type: Sequelize.STRING(4),
      allowNull: false
    },
    barCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    publishingCompany: {
      type: Sequelize.STRING(25),
      allowNull: false
    },
    issueNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    numberOfPages: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "book"
  }
);

module.exports = Book;
