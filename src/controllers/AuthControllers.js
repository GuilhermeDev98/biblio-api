const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    const { username, name, email, password, phone } = req.body;

    const user = User.create({
      username,
      name,
      email,
      password,
      phone
    });

    user.then(() => {
      res.json(user);
    }).catch(err => res.json(err))
  },

  async login(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email }, include: [{ model: Role }] }).then(
      user => {
        if (user) {
          if (user.blocked) {
            return res.status(403).json({
              error: {
                message: "Blocked"
              }
            });
          }
          const passwordCompared = bcrypt.compareSync(password, user.password);
          if (passwordCompared) {
            const token = jwt.sign(
              {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role.name
              },
              process.env.SECRET_KEY,
              { expiresIn: 86400 }
            );

            return res.json({ token: token });
          }

          res.status(404).json({
            error: {
              message: "Incorrect Password"
            }
          });
        }
        res.status(404).json({
          error: {
            message: "Email Not Found"
          }
        });
      }
    );
  }
};
