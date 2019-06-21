require("../../start/index");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mariadb",
    dialectOptions: {
      connectTimeout: 1000
    }
  }
);

module.exports = sequelize;
