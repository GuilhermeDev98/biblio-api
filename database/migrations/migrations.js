require("../../start/index");

const sequelize = require("../../src/config/database");
const Sequelize = require("sequelize").Sequelize;
const queryInterface = sequelize.queryInterface;

const UserMigration = require("./UserMigration");
const RoleMigration = require("./RoleMigration");
const PermissionMigration = require("./PermissionMigration");
const BookMigration = require("./BookMigration");
const LoanMigration = require("./LoanMigration");

sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
  RoleMigration.down().then(() => {
    RoleMigration.up();
  });
  // PermissionMigration.down().then(() => {
  //   PermissionMigration.up();
  // });
  // UserMigration.down().then(() => {
  //   UserMigration.up();
  // });
  // BookMigration.down().then(() => {
  //   BookMigration.up();
  // });
  // LoanMigration.down().then(() => {
  //   LoanMigration.up();
  // });
});
