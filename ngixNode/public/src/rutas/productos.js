const express = require("express");
const { Router } = express;
const routerDeProductos = new Router();
const apiProductos = new Router();
const logger = require("../utils/loggers");
const { routIndex, getProductsRout, productsTest, getApiProductos, failRoute } = require("../controlador/productos");
//Ver productos estan en mongoDB
//PRODUCTOS FAKER
routerDeProductos.get("/", checkAuthentication, getProductsRout);
routerDeProductos.get("/test", checkAuthentication, productsTest);
////
apiProductos.get("/productos", getApiProductos);
///////////////////////////////////RUTAS DESAFIO OBJECT PROCES((INFO))

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.redirect("/loguear");
  }
}
module.exports = { apiProductos, routerDeProductos };