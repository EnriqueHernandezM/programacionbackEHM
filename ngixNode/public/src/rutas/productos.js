const express = require("express");
const { Router } = express;
const routerDeProductos = new Router();
const apiProductos = new Router();
const logger = require("../utils/loggers");
const { getProductsRout, productsTest, getApiProductos, newApiProduct, deleteElementInventary, modificProduct } = require("../controlador/productos");

routerDeProductos.get("/", checkAuthentication, getProductsRout);
routerDeProductos.get("/test", checkAuthentication, productsTest);
////
apiProductos.get("/productos", getApiProductos);
apiProductos.post("/productos", newApiProduct);
apiProductos.put("/productos/:id", modificProduct);
apiProductos.delete("/productos/:id", deleteElementInventary);
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
