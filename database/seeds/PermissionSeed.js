const Permission = require("../../src/models/Permission");

const models = ["role", "permission", "user", "book", "loan"];
const methods = [
  "index",
  "create",
  "store",
  "show",
  "edit",
  "update",
  "delete"
];
const roleId = 2;

models.map(async model => {
  methods.map(async method => {
    await Permission.create({
      name: `${method}_${model}`,
      description: `${method} ${model}`,
      roleId
    });
  });
});

Permission.create({
  name: "giveback_loan",
  description: "giveback loan",
  roleId
});

Permission.create({
  name: "toextend_loan",
  description: "to extend loan",
  roleId
});
