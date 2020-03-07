const HasPemission = require("../utils/HasPemission");
const HasRole = require("../utils/HasRole");
const Loan = require("../models/Loan");
const User = require("../models/User");
const Book = require("../models/Book");



module.exports = {
  async index(req, res) {
    res.json({'hello': 'world'});
  },
  async me(req, res) {
    res.json(req.user);
  },
  async loans(req, res) {
    if (  (await HasRole("admin", req.user)) || (await HasRole("librarian", req.user))) {
      const loans = await Loan.findAll({
        where: { userId: req.user.id, returnedIn: null },
        include: [Book]
      });
      return res.json(loans);
    }
    return res
      .status(401)
      .json({ error: { message: "unauthorized" } });
  }
};
