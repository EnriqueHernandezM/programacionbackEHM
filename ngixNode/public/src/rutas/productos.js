const express = require("express");
const { Router } = express;
const routerDeProductos = new Router();
const apiProductos = new Router();
const checkAuthentication = require("../middleware/checkAuth");
const { getApiProducts, getOneProductById, oneNewProdutToApi, deleteElementInventary, modificProduct } = require("../controlador/productos");

apiProductos.get("/productos", checkAuthentication, getApiProducts);
apiProductos.get("/productos/:id", getOneProductById);
apiProductos.post("/productos", oneNewProdutToApi);
apiProductos.put("/productos/:id", modificProduct);
apiProductos.delete("/productos/:id", deleteElementInventary);

module.exports = { apiProductos, routerDeProductos };
