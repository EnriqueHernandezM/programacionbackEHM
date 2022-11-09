const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const perfil = Router();
const port = process.env.PORT || 8081;
const multer = require("multer");
const Contenedor = require("./class.js");
const containerProducts = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para mostrar imagenes!!!!
app.use("/public/files", express.static(__dirname + "/public/files"));

//Configuracion PUG
//
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/productos", routerDeProductos);
app.use("/perfil", perfil);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
//
//Solicitudes & res
//
app.get("/", (req, res) => {
  res.render("hello.pug", { saludo: "bienvenido a esta gran vinateria" });
});
routerDeProductos.get("/", (req, res) => {
  let products1 = containerProducts.getAll();
  if (products1.length) {
    res.render("products.pug", { products: products1 });
  }
  if (products1.length == 0) {
    res.render("productslist", { products: "Al parecer no hay productos aun", productsExist: false });
  }
});
routerDeProductos.get("/newProduct", (req, res) => {
  res.render("newProduct.pug", {});
});

//configuracion para subir formulario en upload/files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/productos", upload.none(), (req, res) => {
  const body = req.body;
  if (body.producto == "" || body.precio < 0 || body.imagen == "") {
    res.render("result.pug", {
      confirmacion: "al parecer hubo un error",
    });
  } else {
    containerProducts.save(body);
    res.render("result.pug", {
      confirmacion: "producto Guardado Correctamente",
    });
  }
});
