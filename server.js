const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const arrayCobjetos = require("./class.js");
const fs = require("fs");
app.get("/productos", (req, res) => {
  res.json(arrayCobjetos);
});
app.get("/productoRandom", (req, res) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  let buscaPborrar = arrayCobjetos.find((el) => el.id == random(1, 4));
  res.json(buscaPborrar);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
