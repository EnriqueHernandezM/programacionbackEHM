const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const perfil = Router();
const port = process.env.PORT || 8081;
const multer = require("multer");
const Contenedor = require("./class.js");
const containerProducts = new Contenedor();
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para mostrar imagenes!!!!
app.use("/public/files", express.static(__dirname + "/public/files"));

//Configuracion Handlebars
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.use("/productos", routerDeProductos);
app.use("/perfil", perfil);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
//
//Solicitudes & res
//
app.get("/", (req, res) => {
  res.render("reception", { saludo: "bienvenido a esta gran vinateria" });
});
routerDeProductos.get("/", (req, res) => {
  let products1 = containerProducts.getAll();
  if (products1.length) {
    res.render("productslist", { products: products1, productsExist: true });
  }
  if (products1.length == 0) {
    res.render("productslist", { products: "Al parecer no hay productos aun", productsExist: false });
  }
});
routerDeProductos.get("/newProduct", (req, res) => {
  res.render("newProduct", {});
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
  if (body.length) {
    containerProducts.save(body);
    res.render("guardadoOk", { confirmacion: "Producto Guardado Correctamente" });
  } else {
    res.render("guardadoOk", { confirmacion: "ERROR" });
  }
});
