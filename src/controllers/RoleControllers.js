const User = require("../models/User");
const HasPemission = require("../utils/HasPemission");

module.exports = {
  async store(req, res) {
    return res.json({ error: { message: "in contruction !" } });
  }
};
