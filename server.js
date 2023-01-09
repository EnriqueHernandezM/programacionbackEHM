const express = require("express");
const { Router } = express;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const routerDeProductos = Router();
const PORT = process.env.PORT || 8081;
const { Contenedor } = require("./app");
const { ContenedorMsjes } = require("./appMsjes");
const containerProducts = new Contenedor("inventario");
const containerMsjes = new ContenedorMsjes("mensajes");
//CONFIGURACION NECESARIA PARA IO
const str = require("./src/contenedores/mocks");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuracion Para EJS
app.set("view engine", "ejs");
app.use("/productos", routerDeProductos);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));
//
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://enriquehm:0h47RMcEkqCLHjTP@cluster0.ckqspop.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, //sesion durara 10 minutos
    },
  })
);
//
const validar = (req, res, next) => {
  if (req.session?.user === "Enrique" && req.session?.admin) {
    return next();
  }
  let tex = "hola para ver esta ruta necesitas etsar logueado";
  return res.status(401).render("pages/formloguear", { sessionE: "fake", msg: tex });
};
//Solicitudes & res
// INICIO
app.get("/", (req, res) => {
  let veces;
  if (req.session.cont) {
    req.session.cont++;
    veces = req.session.cont;
  } else {
    req.session.cont = 1;

    veces = +1;
  }
  res.render("pages/index", { saludo: "bienvenido a esta gran vinateria", imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg", visitas: veces });
});
//Ver productos estan en mongoDB
routerDeProductos.get("/", (req, res) => {
  res.render("pages/productos", {});
});
//PRODUCTOS FAKER
app.get("/api/productos-test", validar, (req, res) => {
  res.render("pages/tablafaker", { stre: str() });
});
////
//FORMULARIO LOGUIN
app.get("/loguear", (req, res) => {
  if (req.session?.user === "Enrique" && req.session?.admin) {
    res.render("pages/formloguear", { sessionE: true, userE: req.session.user });
  } else {
    res.render("pages/formloguear", { sessionE: "esp" });
  }
});
//
app.post("/loguear", (req, res) => {
  const { nombreUserLog, contraseñaLog } = req.body;
  const user = { nombreUserLog, contraseñaLog };
  console.log(user);
  if (nombreUserLog !== "Enrique" || contraseñaLog !== "260199") {
    return res.render("pages/formloguear", { sessionE: false });
  }
  req.session.user = nombreUserLog;
  req.session.admin = true;
  res.render("pages/formloguear", { sessionE: true, userE: nombreUserLog });
});
//////////////////////////////////////////////LOG OUT SESSION
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("algo salio mal en la pagina intenta de nuevo");
    } else {
      res.render("pages/formloguear", { sessionE: "esp" });
    }
  });
});
///////////////////////////////////////////////////Sockets
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
    let guardar = await containerMsjes.saveMsges(data);
    let probandoNormalizr = containerMsjes.normalizarMsges(guardar);
    io.sockets.emit("listaMsgs", probandoNormalizr);
  });
});
