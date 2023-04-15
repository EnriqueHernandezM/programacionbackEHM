const express = require("express");
const { Router } = express;
const routerDeProductos = new Router();
const apiProductos = new Router();
const { checkAuthentication, checkAuthenticationAdmin } = require("../middleware/checkAuth");
const { getApiProductsToSearch, getApiProducts, getOneProductById, oneNewProdutToApi, deleteElementInventary, modificProduct } = require("../controlador/productos");

apiProductos.get("/productos/busqueda", checkAuthentication, getApiProductsToSearch);
apiProductos.get("/productos", checkAuthentication, getApiProducts);
apiProductos.get("/productos/:id", checkAuthentication, getOneProductById);
apiProductos.post("/productos", checkAuthentication, oneNewProdutToApi);
apiProductos.put("/productos/:id", checkAuthentication, modificProduct);
apiProductos.delete("/productos/:id", checkAuthentication, deleteElementInventary);

module.exports = { apiProductos, routerDeProductos };
