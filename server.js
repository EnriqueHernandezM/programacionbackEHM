const express = require("express");
const { Router } = express;
const app = express();
const routerDeUsuarios = Router();
const port = process.env.PORT || 8081;
const arrayCobjetos = require("./class.js");
const multer = requre("multer");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extendend: true }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/usuarios");
app.get("/", (req, res) => {
  res.send("HOLA puedes buscar endPoints: productos o productoRandom!");
});
app.get("/productos", (req, res) => {
  res.json(arrayCobjetos);
});
app.get("/productoRandom", (req, res) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  let buscaPborrar = arrayCobjetos.find((el) => el.id == random(1, 6));
  res.json(buscaPborrar);
});
