const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const routerCarrito = Router();
const PORT = process.env.PORT || 8081;
const multer = require("multer");
//importamos class de productos FS
const { DateTime } = require("luxon");
const cors = require("cors");
const { json } = require("express");
//CONFIGURACION NECESARIA PARA IO
const rutaResult = require("./daos/index");
const functionsProducts = new rutaResult.productos();
const functionsTrolley = new rutaResult.trolleys();

//
app.use(cors({ origin: "*" }));
const httpServer = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//para mostrar imagenes!!!!
app.use(express.static(__dirname + "/public"));
//Configuracion Server

//
app.use("/api/productos", routerDeProductos);
app.use("/api/carritoDeCompras", routerCarrito);

//configuracion para subir formulario en upload/files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//
httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));
//
///   ADMIN
let userOrAdmin = true;
//let userOrAdmin = false;
//
//Solicitudes & res
//
///
//RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("HOLA VISITA: http://127.0.0.1:5500/root/views/productos.html");
});
////RUTAS NO DEFINIDAS
app.get("*", (req, res) => {
  res.json({ rout: "Esta ruta nop esta definida" });
});
//Ruta para productos
routerDeProductos.get("/", async (req, res) => {
  res.json(await functionsProducts.getAll());
});
//GET CON ID
routerDeProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await functionsProducts.getById(id));
});
//ruta para hacer post en productos
routerDeProductos.post(
  "/",
  (req, res, next) => {
    if (userOrAdmin === true) {
      next();
    } else {
      return res.status(404).json({ error: true, description: "solo admin" });
    }
  },
  (req, res) => {
    const { body } = req;
    functionsProducts.save(body);
    res.json({ ok: "producto agregado correctamente" });
  }
);
//
//Ruta para hacer put en productos EDITARLOS
routerDeProductos.put(
  "/:id",
  (req, res, next) => {
    if (userOrAdmin === true) {
      next();
    } else {
      return res.status(404).json({ error: true, description: "solo admin" });
    }
  },
  (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json(functionsProducts.modifyElement(id, body));
  }
);
//Ruta para hacer dlete en productos
routerDeProductos.delete("/:id", async (req, res, next) => {
  if (userOrAdmin === true) {
    next();
    const { id } = req.params;
    res.json(await functionsProducts.deleteById(id));
  } else {
    return res.status(404).json({ error: true, description: "solo admin" });
  }
});
///
////ruta para mostrar productos en carrrito
////
///
//
routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  res.json(await functionsTrolley.getAllForItemsTrolley(id));
  //
  // RUTA PARA CREAR UN NUEVO CARRITO
});
routerCarrito.post("/", (req, res) => {
  const { body } = req;
  res.json(functionsTrolley.creatteCart(body));
});
//RUTA Para incorporar productos al carrito por su id de producto
routerCarrito.post("/:id/productos", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const idProduct = body.producto;
  res.json(await functionsTrolley.addToCart(id, idProduct));
});
//Ruta para eliminar todo el carrito
routerCarrito.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json(functionsTrolley.deleteByIdAllTrolley(id));
});
//Ruta par eliminar
routerCarrito.delete("/:id/productos/:idItem", (req, res) => {
  const { id } = req.params;
  const { idItem } = req.params;
  res.json(functionsTrolley.deleteByIdAllTrolleyItem(id, idItem));
});
