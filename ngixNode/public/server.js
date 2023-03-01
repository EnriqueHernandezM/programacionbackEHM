const { config } = require("dotenv");
config();
//////////////
const express = require("express");
const app = express();
///////////////////////////////////////////////////  RUTAS/////////////////////
const index = require("./src/rutas/index");
const { routerDeProductos, apiProductos } = require("./src/rutas/productos");
const { randomOperation, infoConCompresion } = require("./src/rutas/info");
const { carrito, apiCarrito } = require("./src/rutas/carrito");
const autenticacion = require("./src/rutas/autenticacion");

const passport = require("passport");
require("./src/passport/local-auth");
let argv = require("minimist")(process.argv.slice(2));
let puertoPorArgumentos = argv["_"][0];
const PORT = process.env.PORT || puertoPorArgumentos || 8080;
const session = require("express-session");

const httpServer = require("http").createServer(app);
const logger = require("./src/utils/loggers");
const flash = require("connect-flash");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
httpServer.listen(PORT, () => logger.log("info", "SERVER ON http://localhost:" + PORT));
///////////////////////////////////sockets
const io = require("socket.io")(httpServer);
const { ContenedorMsjes } = require("./src/contenedores/appMsjes");
const containerMsjes = new ContenedorMsjes("mensajes");
const { Contenedor } = require("./src/negocio/productos");
const containerProducts = new Contenedor("productos");
/////////COKIES///////////////////////////////////////////////////////////////////////SE QUEDA
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => logger.log("info", "Connected to Mongo "))

  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  });
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DATABAS,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, //sesion durara 10 minutos
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  app.locals.crearCuentamsg = req.flash("crearCuentamsg");
  next();
});
app.use("/", index);
app.use("/productos", routerDeProductos);
app.use("/api", apiProductos);
app.use("/operacion", randomOperation);
app.use("/info", infoConCompresion);
app.use("/carrito", carrito);
app.use("/api", apiCarrito);
app.use("/", autenticacion);

io.on("connection", async (socket) => {
  logger.log("info", "con3ct Socket");
  //sOCKETS PRODUCTOS
  socket.on("on", async () => {
    io.sockets.emit("feedAct", await containerProducts.getAll());
  });

  socket.on("actualizame", async (data) => {
    let act = await containerProducts.save(data);
    io.sockets.emit("feedAct", act);
  });
  socket.on("deleteElement", async (idAb) => {
    containerProducts.deleteById(idAb);
    const actual = await containerProducts.getAll();
    io.sockets.emit("feedAct", actual);
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
