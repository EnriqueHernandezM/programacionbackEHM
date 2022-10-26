const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const arrayCobjetos = require("./class.js");
const fs = require("fs");
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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
