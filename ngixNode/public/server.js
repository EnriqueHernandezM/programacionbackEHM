const { config } = require("dotenv");
config();

const express = require("express");
const app = express(); /////////////////////aqui conectamos con mongo
require("./src/databasMongo/databas");
///////////////////////////////////////////////////  RUTAS EXPOPRTS/////////////////////
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

const logger = require("./src/utils/loggers");
const flash = require("connect-flash");

const httpServer = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

httpServer.listen(PORT, () => logger.log("info", "SERVER ON http://localhost:" + PORT));
///////////////////////////////////SOCKETS
/////////////////////////////////////////////se me ocurrio hacer asi lo de sockets
const io = require("socket.io")(httpServer);
const socketModule = require("./src/sockets/sockets");
socketModule(io);

const session = require("./src/utils/session");
app.use(session);
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
app.use("/", carrito);
app.use("/api", apiCarrito);
app.use("/", autenticacion);
const { failRoute } = require("./src/controlador/index");
app.get("*", failRoute);
