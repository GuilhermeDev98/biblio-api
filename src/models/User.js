const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Model = Sequelize.Model;
const bcrypt = require("bcrypt");
const Role = require("../models/Role");

class User extends Model {}
User.init(
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    blocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  },
  {
    hooks: {
      beforeCreate: user => {
        user.password = bcrypt.hashSync(user.password, 10);
        user.roleId = user.roleId || 1;
      }
    },
    sequelize,
    modelName: "user",
    instanceMethods: {
      toJSON: function() {
        var ret = Instance.prototype.toJSON.call(this);

        delete ret.password;
        return ret;
      }
    }
  }
);

User.belongsTo(Role);

module.exports = User;
