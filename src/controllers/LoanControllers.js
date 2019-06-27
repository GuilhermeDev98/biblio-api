const HasPemission = require("../utils/HasPemission");
const HasRole = require("../utils/HasRole");
const { addDays, isAfter } = require("date-fns");

const Book = require("../models/Book");
const User = require("../models/User");
const Loan = require("../models/Loan");

module.exports = {
  async index(req, res) {
    if (req.params.user_id) {
      if (
        (await HasRole("admin", req.user)) ||
        (await HasRole("biblio", req.user))
      ) {
        const loans = await Loan.findAll({
          where: { userId: req.params.user_id, returnDate: null },
          include: [User, Book]
        });
        return res.json(loans);
      }
      return res
        .status(401)
        .json({ error: { message: "you shall not pass !" } });
    } else {
      if (
        (await HasRole("admin", req.user)) ||
        (await HasRole("biblio", req.user))
      ) {
        const loans = await Loan.findAll({where: { returnDate: null }, include: [User, Book] });
        return res.json(loans);
      } else {
        const loans = await Loan.findAll({
          where: { userId: req.params.user_id, returnDate: null },
          include: [User, Book]
        });
        return res.json(loans);
      }
    }
  },
  async store(req, res) {
    if (!req.body.bookId) {
      return res.status(400).json({ error: { message: "book is required !" } });
    }
    if (!req.body.userId) {
      return res.status(400).json({ error: { message: "user is required !" } });
    }
    req.body.returnDate = addDays(new Date(), 10);
    const loan = await Loan.create(req.body);
    return res.json(loan);
  },
  async giveBack(req, res) {
    if (await HasPemission("giveback_loan", req.user)) {
      const loan = await Loan.findByPk(req.params.id);

      if (loan.returnedIn) {
        return res
          .status(400)
          .json({ error: { message: "already returned !" } });
      }

      await loan.set({ returnedIn: new Date() }).save();
      return res.status(200).json(loan);
    }

    return res.status(401).json({ error: { message: "you shall not pass !" } });
  },
  async toExtend(req, res) {
    if (await HasPemission("toextend_loan", req.user)) {
      const loan = await Loan.findByPk(req.params.id);
      if (loan.returnedIn) {
        return res
          .status(400)
          .json({ error: { message: "already returne !" } });
      }
      if (isAfter(new Date(), loan.returnDate)) {
        return res
          .status(400)
          .json({ error: { message: "due date expired !" } });
      }
      const returnDate = addDays(new Date(), 10);
      await loan.set({ returnDate }).save();
      return res.status(200).json(loan);
    }
    return res.status(401).json({ error: { message: "you shall not pass !" } });
  }
};
