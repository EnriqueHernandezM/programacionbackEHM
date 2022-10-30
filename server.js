const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const crearPerfil = Router();
const port = process.env.PORT || 8081;
const multer = require("multer");
const getAllOk = require("./class.js");

let fs = require("fs");
const { get } = require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerDeProductos);
app.use("/crearPerfil", crearPerfil);
//para mostrar imagenes!!!!
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("HOLA puedes buscar endPoints: productos o productoRandom!");
});
routerDeProductos.get("/", (req, res) => {
  res.json(getAllOk);
});
routerDeProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  let us = getAllOk.find((el) => el.id == id);
  us != undefined ? res.json({ success: true, user: us }) : res.json({ err: true, msg: "no encontrado" });
});
routerDeProductos.post("/", (req, res) => {
  const { body } = req;
  let all = getAllOk;
  const id = all.length + 1;
  body.id = id;
  all.push(body);
  let products = JSON.stringify(all);
  fs.writeFileSync("./productos.txt", products);
  res.send({ body });
});
routerDeProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let all = getAllOk;
  let encontrado = all.findIndex((el) => el.id == id);
  encontrado >= 0 ? (all[encontrado] = body) : res.json({ err: true, msg: "no encontrado" });
  let products = JSON.stringify(all);
  fs.writeFileSync("./productos.txt", products);
  res.json(body);
});
routerDeProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  let arr = getAllOk;
  let encontrado = arr.findIndex((el) => el.id == id);
  arr.splice(encontrado, 1);
  let products = JSON.stringify(arr);
  fs.writeFileSync("./productos.txt", products);
  res.send("ok");
});
//FORMULARIO DEL INDEX RUTAS PARA CREAR PERFIL
crearPerfil.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//configuracion para subir foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("myFile"), (req, res) => {
  const file = req.file;
  const body = req.body;
  if (!file) {
    res.send({ error: true });
  } else {
    res.send(body + file.path);
  }
});
