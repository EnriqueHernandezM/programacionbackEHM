const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const PORT = process.env.PORT || 8081;
const multer = require("multer");
const { Contenedor } = require("./app");
const { ContenedorMsjes } = require("./appMsjes");
const containerProducts = new Contenedor("inventario");
const containerMsjes = new ContenedorMsjes("mensajes");
//CONFIGURACION NECESARIA PARA IO
//const str = require("./src/mocks/mocks");

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

app.use("/productos", routerDeProductos);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));
//
//Solicitudes & res
//
////
app.get("/api/productos-test", (req, res) => {});
////
//
//
app.get("/", (req, res) => {
  res.render("pages/index", { saludo: "bienvenido a esta gran vinateria", imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg" });
});
//solo renderisa ejs
routerDeProductos.get("/", (req, res) => {
  res.render("pages/productos", {});
});
//configuracion para subir formulario en uploady/files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

io.on("connection", async (socket) => {
  console.log("cone3ct");
  //sOCKETS PRODUCTOS
  socket.on("on", async () => {
    io.sockets.emit("feedAct", await containerProducts.getAll());
  });

  socket.on("actualizame", async (data) => {
    let act = await containerProducts.save(data);
    io.sockets.emit("feedAct", act);
  });
  socket.on("deleteElement", async (idAb) => {
    const eliminate = await containerProducts.deleteById(idAb);
    io.sockets.emit("feedAct", eliminate);
  });
  //
  //SOCKETS MENSAJES
  //
  socket.on("msg", async (data) => {
    const saved = await containerMsjes.saveMsges(data);
    io.sockets.emit("listaMsgs", saved);
  });
});
