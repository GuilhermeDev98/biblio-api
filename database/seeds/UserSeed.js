const User = require("../../src/models/User");

module.exports = User.create({
  username: "guilhermedev",
  name: "Guilherme Santos",
  email: "guilhermedev@hotmail.com",
  password: "secret",
  phone: "79999042394",
  roleId: 2
});
