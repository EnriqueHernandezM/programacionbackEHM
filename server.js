const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const routerCarrito = Router();
const PORT = process.env.PORT || 8081;
const multer = require("multer");
const { Contenedor } = require("./app");
const { CarritoCompras } = require("./app");
const containerProducts = new Contenedor();
const carritoProducts = new CarritoCompras();
const { DateTime } = require("luxon");
//CONFIGURACION NECESARIA PARA IO
//
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//para mostrar imagenes!!!!
app.use(express.static(__dirname + "/public"));
//Configuracion Para EJS
//
app.set("view engine", "ejs");
//Rutas Disponibles
//
app.use("/productos", routerDeProductos);
app.use("/carritoDeCompras", routerCarrito);

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
//Solicitudes & res
//
app.get("/", (req, res) => {
  res.render("pages/index", { saludo: "bienvenido a esta gran vinateria", imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg" });
});
//
routerDeProductos.get("/", (req, res) => {
  let products1 = containerProducts.getAll();
  if (products1.length) {
    res.render("pages/productos", { products: products1, productsExist: true });
  }
  if (products1.length == 0) {
    res.render("pages/productos", { products: "Al parecer no hay productos aun", productsExist: false });
  }
});

routerCarrito.get("/", (req, res) => {
  let itemsAggregates = carritoProducts.getAllTrolley();
  if (itemsAggregates.length) {
    res.render("pages/carrito", { productsC: itemsAggregates, productsExistC: true });
  }
  if (itemsAggregates.length == 0) {
    res.render("pages/carrito", { productsC: "Al parecer no hay productos aun", productsExistC: false });
  }
});

routerDeProductos.post("/", upload.none(), (req, res) => {
  const { body } = req;
  containerProducts.save(body);
  let products1 = containerProducts.getAll();
  res.render("pages/productos", { products: products1, productsExist: true });
});

routerCarrito.post("/", upload.none(), (req, res) => {
  const { body } = req;
  let itemsAggregates = carritoProducts.addToCart(body);
  res.render("pages/carrito", { productsC: itemsAggregates, productsExistC: true });
});
routerDeProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  let products1 = containerProducts.getAll();
  containerProducts.modifyElement(id, body);
  res.render("pages/productos", { products: products1, productsExist: true });
});

// AQUI EMPIEZA EL CODIGO DeL
//CHAT;

//ARRAY PARA MESJES
const msgs = [];

io.on("connection", (socket) => {
  socket.on("on", () => {
    let products = containerProducts.getAll();
    io.sockets.emit("feedAct", products);
  });

  socket.on("msg", (data) => {
    console.log("data", data);
    msgs.push({
      socketid: socket.id,
      email: data.email,
      mensaje: data.mensaje,
      now: DateTime.local(),
    });
    containerProducts.saveMsges(msgs);
    io.sockets.emit("listaMsgs", msgs);
  });

  socket.on("actualizame", (data) => {
    let act = containerProducts.save(data);
    io.sockets.emit("feedAct", act);
  });
  //NO OLVIDAR CHECAR  VAR CONFIG iIO
});
