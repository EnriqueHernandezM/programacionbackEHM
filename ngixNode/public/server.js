const logger = require("./src/utils/loggers");
const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const randomOperation = Router();
const infoConCompresion = Router();
let argv = require("minimist")(process.argv.slice(2));
let puertoPorArgumentos = argv["_"][0];
const PORT = process.env.PORT || puertoPorArgumentos || 8080;
const routes = require("./src/routes");
////////////////////////////////////// CLUSTER UTILIZANDO EL MODULO NATIVO
if (argv["_"][1] === "prueba") {
  const cluster = require("cluster");
  const numCPUs = require("os").cpus().length;
  if (cluster.isMaster) {
    logger.log("info", `Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      cluster.fork();
    });
  } else {
    const httpServer = require("http").createServer(app);
    logger.log("info", `Worker ${process.pid} !`);

    httpServer.listen(PORT);

    app.get("/api/randoms", routes.apiRandoms);
  }
} else {
  /////////////////////////////////////
  ////////////////////////
  //////////////////////////////////////////////////MINIMIST REQ PARA USAR PARAM EN TERMINA

  const { Contenedor } = require("./src/contenedores/app");
  const { ContenedorMsjes } = require("./src/contenedores/appMsjes");
  const containerProducts = new Contenedor("productos");
  const containerMsjes = new ContenedorMsjes("mensajes");
  //
  const httpServer = require("http").createServer(app);
  const io = require("socket.io")(httpServer);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //para mostrar imagenes!!!!
  app.use(express.static(__dirname + "/public"));
  //
  app.set("view engine", "ejs");
  app.use("/api", randomOperation);
  app.use("/productos", routerDeProductos);
  //USAMOS ROUTER PARA COMPARAR USANDO GZIP
  app.use("/infoConCompresion", infoConCompresion);
  httpServer.listen(PORT, () => logger.log("info", "SERVER ON http://localhost:" + PORT));
  ///

  //
  const mongoose = require("mongoose");
  const Usuarios = require("./src/models/usuarios");
  const bcrypt = require("bcrypt");
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  //
  const session = require("express-session");
  const MongoStore = require("connect-mongo");
  const flash = require("connect-flash");
  ///REQUERIMOS PARA USAR ENV
  const { config } = require("dotenv");

  config();
  //////////////
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABAS)
    .then(() => logger.log("info", "Connected to Mongo para registrar Usuarios"))

    .catch((e) => {
      logger.log("error", e);
      throw "can not connect to the mongo!";
    });

  function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        Usuarios.findOne({ email }, (err, user) => {
          if (err) return done(err);

          if (!user) {
            logger.log("info", "User Not Found with email " + email);
            return done(null, false, req.flash("crearCuentamsg", "tenemos algun problema o verifica tu informacion"));
          }

          if (!isValidPassword(user, password)) {
            logger.log("info", "Invalid Password");
            return done(null, false, req.flash("crearCuentamsg", "tenemos algun problema o verifica tu informacion"));
          }
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    "crearCuenta",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        Usuarios.findOne({ email: email }, function (err, user) {
          if (err) {
            logger.log("info", "Error in SignUp: " + err);
            return done(err);
          }

          if (user) {
            logger.log("info", "User already exists");
            return done(null, false, req.flash("crearCuentamsg", "cuenta ya existente"));
          }

          const newUser = {
            email: email,
            password: createHash(password),
          };
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              logger.log("info", "Error in Saving user: " + err);
              return done(err);
            }
            console.log(user);
            logger.log("info", "User Registration succesful");
            return done(null, userWithId);
          });
        });
      }
    )
  );

  /////////COKIES
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
        maxAge: 60000, //sesion durara 10 minutos
      },
    })
  );

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    app.locals.crearCuentamsg = req.flash("crearCuentamsg");
    next();
  });
  //Solicitudes & re
  // INICIO
  app.get("/", routes.routIndex);
  //Ver productos estan en mongoDB
  routerDeProductos.get("/", routes.getProductsRout);
  //PRODUCTOS FAKER
  app.get("/api/productos-test", checkAuthentication, routes.productsTest);
  ////
  /////////////////////////////////////////////Crear Cuenta
  app.get("/crearCuenta", routes.getCreateAcount);
  ///
  app.post("/crearCuenta", passport.authenticate("crearCuenta", { passReqToCallback: true }), routes.postCreateAcount);
  ////
  //FORMULARIO LOGUIN
  app.get("/loguear", routes.getLoguear); //
  app.post("/loguear", passport.authenticate("login", { passReqToCallback: true }), routes.postLoguear);
  //////////////////////////////////////////////LOG OUT SESSION
  app.get("/logout", routes.logOut);

  function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      /*  let tex = "hola para ver esta ruta necesitas etsar logueado";
    return res.status(401).render("pages/formloguear", { sessionE: "fake", msg: tex }); */
      logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
      res.redirect("/loguear");
    }
  }
  ///////////////////////////////////RUTAS DESAFIO OBJECT PROCES((INFO))
  //
  app.get("/infoSinCompresion", routes.info);
  const compression = require("compression");
  infoConCompresion.use(compression()); //use el routing para implementar compression
  infoConCompresion.get("/", routes.info);
  app.get("/infoConLog", routes.infoConLog);
  app.get("/infoSinLog", routes.info);
  //randomOperation.use(compression());//prueba
  randomOperation.get("/randoms", routes.apiRandoms);

  ///////////////////////////////////////////////////Sockets
  app.get("*", routes.failRoute);
  ///
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
}
