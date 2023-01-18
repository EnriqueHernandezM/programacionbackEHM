const express = require("express");
const { Router } = express;
const app = express();
const routerDeProductos = Router();
const PORT = process.env.PORT || 8081;
const { Contenedor } = require("./app");
const { ContenedorMsjes } = require("./appMsjes");
const containerProducts = new Contenedor("productos");
const containerMsjes = new ContenedorMsjes("mensajes");
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
///
const routes = require("./src/routes");
const mongoose = require("mongoose");
const Usuarios = require("./src/models/usuarios");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const { config } = require("dotenv");
config();
//////////////
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => console.log("Connected to Mongo para registrar Usuarios"))
  .catch((e) => {
    console.error(e);
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
          console.log("User Not Found with email " + email);
          return done(null, false, req.flash("crearCuentamsg", "tenemos algun problema o verifica tu informacion"));
        }

        if (!isValidPassword(user, password)) {
          console.log("Invalid Password");
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
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false, req.flash("crearCuentamsg", "cuenta ya existente"));
        }

        const newUser = {
          email: email,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
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
//Solicitudes & res
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
app.post("/crearCuenta", passport.authenticate("crearCuenta", { successRedirect: "/", failureRedirect: "/crearCuenta", passReqToCallback: true }), routes.postCreateAcount);
////
//FORMULARIO LOGUIN
app.get("/loguear", routes.getLoguear); //
app.post("/loguear", passport.authenticate("login", { successRedirect: "/", failureRedirect: "/loguear", passReqToCallback: true }), routes.postLoguear);
//////////////////////////////////////////////LOG OUT SESSION
app.get("/logout", routes.logOut);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    /*  let tex = "hola para ver esta ruta necesitas etsar logueado";
    return res.status(401).render("pages/formloguear", { sessionE: "fake", msg: tex }); */
    res.redirect("/loguear");
  }
}
///////////////////////////////////Ruta INFO
//
app.get("/info", routes.info);
app.get("/api/randoms", routes.apiRandoms);
app.get("*", routes.failRoute);
///////////////////////////////////////////////////Sockets

io.on("connection", async (socket) => {
  console.log("con3ct");
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
