const express = require("express");
const passport = require("passport");
const { Router } = express;
const autenticacion = new Router();

const { getCreateAcount, postCreateAcount, getLoguear, postLoguear, logOut } = require("../controlador/autenticacion");
autenticacion.get("/crearCuenta", getCreateAcount);
///
autenticacion.post(
  "/crearCuenta",
  passport.authenticate("crearCuenta", { passReqToCallback: true, failureRedirect: "/crearCuenta" }),
  postCreateAcount
);
////
//FORMULARIO LOGUIN
autenticacion.get("/loguear", getLoguear); //
autenticacion.post("/loguear", passport.authenticate("login", { passReqToCallback: true, failureRedirect: "/loguear" }), postLoguear);
//////////////////////////////////////////////LOG OUT SESSION
autenticacion.get("/logout", logOut);

module.exports = autenticacion;
