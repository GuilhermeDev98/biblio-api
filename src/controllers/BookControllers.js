const HasPemission = require("../utils/HasPemission");
const Book = require("../models/Book");
const up = require("../config/upload");

module.exports = {
  async index(req, res) {
    if (await HasPemission("index_book", req.user)) {
      const books = await Book.findAll();
      return res.json(books);
    }
    return res.status(401).json({ error: { message: "you shall not pass !" } });
  },
  async store(req, res) {
    if (await HasPemission("store_book", req.user)) {
      const image = await up.uploader.upload(req.file.path);
      req.body.cover = image.secure_url;
      const book = await Book.create(req.body);
      return res.status(201).json(book);
    }
    return res.status(401).json({ error: { message: "you shall not pass !" } });
  },
  async update(req, res) {
    if (await HasPemission("update_book", req.user)) {
      const book = await Book.findByPk(req.params.id);
      await book.update(req.body);
      return res.status(201).json(book);
    }

    return res.status(401).json({ error: { message: "you shall not pass !" } });
  },
  async destroy(req, res) {
    if (await HasPemission("delete_book", req.user)) {
      const book = await Book.findByPk(req.params.id);
      await book.destroy(req.body);
      return res.status(204).json(book);
    }

    return res.status(401).json({ error: { message: "you shall not pass !" } });
  }
};
