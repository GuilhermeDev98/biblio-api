require("../../start/index");
const Sequelize = require("sequelize");

if (process.env.ENV == "development") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        connectTimeout: 1000
      }
    }
  );
} else if (process.env.ENV == "production") {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      connectTimeout: 1000
    }
  });
}

module.exports = sequelize;
