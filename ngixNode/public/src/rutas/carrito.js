const express = require("express");
const { Router } = express;
const apiCarrito = new Router();
const { getTrolleyByClientId, postOneItemTrolley, confirmationBuy, deleteItemTrolley } = require("../controlador/carrito");
const { checkAuthentication, checkAuthenticationAdmin } = require("../middleware/checkAuth");

apiCarrito.get("/carrito/:id", checkAuthentication, getTrolleyByClientId);
apiCarrito.post("/carrito", checkAuthentication, postOneItemTrolley);
apiCarrito.delete("/carritodelete/:id", checkAuthentication, deleteItemTrolley);
apiCarrito.get("/confirmarcompra", checkAuthentication, confirmationBuy);

module.exports = { apiCarrito };
