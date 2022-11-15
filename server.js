const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const PORT = process.env.PORT || 8081;
const multer = require("multer");
const Contenedor = require("./app");
const containerProducts = new Contenedor();
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

app.use("/productos", routerDeProductos);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));
//
//Solicitudes & res
//
app.get("/", (req, res) => {
  res.render("pages/index", { saludo: "bienvenido a esta gran vinateria", imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg" });
});
routerDeProductos.get("/", (req, res) => {
  let products1 = containerProducts.getAll();
  if (products1.length) {
    res.render("pages/productos", { products: products1, productsExist: true });
  }
  if (products1.length == 0) {
    res.render("pages/productos", { products: "Al parecer no hay productos aun", productsExist: false });
  }
});

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

/* app.post("/productos", upload.none(), (req, res) => {
  const body = req.body;
  if (body.producto == "" || body.precio < 0 || body.imagen == "") {
    res.render("pages/confirmacion", {
      confirmacion: "al parecer hubo un error ",
      imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg",
    });
  } else {
    containerProducts.save(body);
  }
}); */
/* AQUI EMPIEZA EL CODIGO DeL 
CHAT
 */ //ARRAY PARA MESJES
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
      now: data.now,
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
