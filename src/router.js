const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");
/* const Resource = require('./utils/routeResource'); */

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

var upload = multer({ storage: storage });

const JwtCheck = require("./middlewares/JwtCheck");

const AuthControllers = require("./controllers/AuthControllers");
const BookControllers = require("./controllers/BookControllers");
const LoanControllers = require("./controllers/LoanControllers");
const RoleController = require("./controllers/RoleController");
const PermissionController = require("./controllers/PermissionController");
const UserController = require("./controllers/UserControllers");


route.post("/auth/register", AuthControllers.register);
route.post("/auth/login", AuthControllers.login);

route.get("/users/me", [JwtCheck], UserController.me);
route.get("/users/loans", [JwtCheck], UserController.loans);


route.get("/books", [JwtCheck], BookControllers.index);
route.post("/books", [JwtCheck, upload.single("cover")], BookControllers.store);
route.put("/books/:id", [JwtCheck], BookControllers.update);
route.delete("/books/:id", [JwtCheck], BookControllers.destroy);

/* 
  Alterar a rota /loans/:user_id para /users/loans/
  e criar a rota route.get("/loans", [JwtCheck], LoanControllers.index); onde trará todos os livros emprestados.
*/
route.get("/loans", [JwtCheck], LoanControllers.index);
route.post("/loans", [JwtCheck], LoanControllers.store);
route.put("/loans/:id/giveback", [JwtCheck], LoanControllers.giveBack);
route.put("/loans/:id/toextend", [JwtCheck], LoanControllers.toExtend);

route.get("/roles", [JwtCheck], RoleController.index);
route.post("/roles", [JwtCheck], RoleController.store);
route.put("/roles/:id", [JwtCheck], RoleController.update);
route.delete("/roles/:id", [JwtCheck], RoleController.destroy);

route.get("/permissions", [JwtCheck], PermissionController.index);
route.post("/permissions", [JwtCheck], PermissionController.store);
route.put("/permissions/:id", [JwtCheck], PermissionController.update);
route.delete("/permissions/:id", [JwtCheck], PermissionController.destroy);

/* Resource('users', UserController, route) */


module.exports = route;
