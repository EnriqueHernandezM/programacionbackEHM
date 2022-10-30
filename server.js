const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const perfil = Router();
const port = process.env.PORT || 8081;
const multer = require("multer");
const Contenedor = require("./class.js");
const containerProducts = new Contenedor();

let fs = require("fs");
const { get } = require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

routerDeProductos.use((req, res, next) => {
  console.log("Time:", Date());
  next();
});
app.use("/api/productos", routerDeProductos);
app.use("/perfil", perfil);
//para mostrar imagenes!!!!
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("HOLA puedes buscar endPoints: /api/productos,/api/productos/id, y /perfil/nuevo o /perfil/existentes ");
});

routerDeProductos.get("/", (req, res) => {
  res.json(containerProducts.getAll());
});
routerDeProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  let us = containerProducts.getAll().find((el) => el.id == id);
  us != undefined ? res.json({ success: true, user: us }) : res.json({ err: true, msg: "no encontrado" });
});
routerDeProductos.post("/", (req, res) => {
  const { body } = req;
  containerProducts.save(body);
  res.send({ id_Asignado: body.id });
});
routerDeProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let all = containerProducts.getAll();
  let product = all.findIndex((el) => el.id == id);
  product >= 0 ? (all[product] = body) : res.json({ err: true, msg: "no encontrado" });
  let products = JSON.stringify(all);
  fs.writeFileSync("./productos.txt", products);
  res.json(body);
});
routerDeProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  let arr = containerProducts.getAll();
  let encontrado = arr.findIndex((el) => el.id == id);
  encontrado <= -1 ? res.json({ err: true, msg: "no encontrado" }) : arr.splice(encontrado, 1);
  let products = JSON.stringify(arr);
  fs.writeFileSync("./productos.txt", products);
  res.send({ producto_con_id: id, msg: "eliminado" });
});

//FORMULARIO DEL INDEX RUTAS PARA CREAR PERFIL
perfil.get("/nuevo", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//ver perfiles ya creados
perfil.get("/existentes", (req, res) => {
  res.json(containerProducts.getAll("./perfiles.txt"));
});

//configuracion para subir foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("myFile"), (req, res) => {
  const file = req.file;
  const body = req.body;
  body.imagen = file.filename;
  containerProducts.saveProduct(body);
  res.json({ message: "usuario guardado", usuario: body });
});
