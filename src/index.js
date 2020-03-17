require("../start/index");
const express = require("express");
// const socket = require("socket.io");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 3000;
const version = process.env.APP_VERSION;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(`/api/${version}/`, require("./router"));

app.listen(port, () => {
  console.log(`App Rodando na porta ${port}`);
});
