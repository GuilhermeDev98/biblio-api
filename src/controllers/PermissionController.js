
const HasPemission = require("../utils/HasPemission");
const Permission = require("../models/Permission");

module.exports = {
  async index(req, res) {
    if (await HasPemission("index_permission", req.user)) {
      const permissions = await Permission.findAll();
      return res.json(permissions);
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async store(req, res) {
    if (await HasPemission("store_permission", req.user)) {
      const permission = await Permission.create(req.body);
      return res.status(201).json(permission);
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async update(req, res) {
    if (await HasPemission("update_permission", req.user)) {
      const permission = await Permission.findByPk(req.params.id);
      await permission.update(req.body);
      return res.status(201).json(permission);
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async destroy(req, res) {
    if (await HasPemission("delete_permission", req.user)) {
      const permission = await Permission.findByPk(req.params.id);
      await permission.destroy(req.body);
      return res.status(204).json(permission);
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  }
};

