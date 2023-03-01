const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");
const enviarcorreo = require("../utils/nodemailer");
const flash = require("connect-flash");
const logger = require("../utils/loggers");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
//app.use(flash());

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
          nombre: req.body.nombre,
          edad: req.body.edad,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          avatar: req.body.avatar,
          carrito: [],
        };
        const mailOptions = {
          from: "Servidor Node. JackVinaterias",
          to: process.env.CORREOSERVICEME,
          subject: "Nuevo Registro",
          html: `<div>
          <h1 style="color: blue;">Email Usuario <span style="color: green;">${email}</span></h1>
            <h1 style="color: blue;">Nombre <span style="color: green;">${req.body.nombre}</span></h1>
            <h1 style="color: blue;">Edad <span style="color: green;">${req.body.edad}</span></h1>
            <h1 style="color: blue;">Direccion <span style="color: green;">${req.body.direccion}</span></h1>
            <h1 style="color: blue;"> Telefono <span style="color: green;">${req.body.telefono}</span></h1>
            </div>`,
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            logger.log("info", `Error in Saving user:${err}`);
            return done(err);
          }
          console.log(user);
          logger.log("info", "User Registration succesful");
          enviarcorreo(mailOptions);
          ///////////////////////////////////////////////////////////////////////
          return done(null, userWithId);
        });
      });
    }
  )
);

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
          logger.log("info", `User Not Found with email  ${email}`);
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