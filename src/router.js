const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });

const JwtCheck = require("./middlewares/JwtCheck");

const AuthControllers = require("./controllers/AuthControllers");
const UserControllers = require("./controllers/UserControllers");
const RoleControllers = require("./controllers/RoleControllers");
const BookControllers = require("./controllers/BookControllers");
const LoanControllers = require("./controllers/LoanControllers");

route.post("/auth/register", AuthControllers.register);
route.post("/auth/login", AuthControllers.login);
route.get("/user/me", [JwtCheck], UserControllers.me);

route.post("/roles/", [JwtCheck], RoleControllers.store);

route.get("/books", [JwtCheck], BookControllers.index);
route.post("/books", [JwtCheck, upload.single("cover")], BookControllers.store);
route.put("/books/:id", [JwtCheck], BookControllers.update);
route.delete("/books/:id", [JwtCheck], BookControllers.destroy);

route.get("/loans/:user_id?", [JwtCheck], LoanControllers.index);
route.post("/loans", [JwtCheck], LoanControllers.store);
route.put("/loans/:id/giveback", [JwtCheck], LoanControllers.giveBack);
route.put("/loans/:id/toextend", [JwtCheck], LoanControllers.toExtend);

module.exports = route;
