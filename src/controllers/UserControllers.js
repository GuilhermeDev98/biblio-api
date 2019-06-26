module.exports = {
  async me(req, res) {
    res.json(req.user);
  }
};
