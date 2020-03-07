
const HasPemission = require("../utils/HasPemission");
const Role = require("../models/Role");

module.exports = {
  async index(req, res) {
    if (await HasPemission("index_role", req.user)) {
      const roles = await Role.findAll();
      return res.json(roles);
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async store(req, res) {
    if (await HasPemission("store_role", req.user)) {
      const role = await Role.create(req.body);
      return res.status(201).json(role);
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async update(req, res) {
    if (await HasPemission("update_role", req.user)) {
      const role = await Role.findByPk(req.params.id);
      await role.update(req.body);
      return res.status(201).json(role);
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async destroy(req, res) {
    if (await HasPemission("delete_role", req.user)) {
      const role = await Role.findByPk(req.params.id);
      await role.destroy(req.body);
      return res.status(204).json(role);
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  }
};

