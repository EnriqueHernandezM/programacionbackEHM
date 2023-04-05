const express = require("express");
const { Router } = express;
const apiCarrito = new Router();
const { getTrolleyByClientId, postTrolley, confirmarCompra, deleteItemTrolley } = require("../controlador/carrito");
apiCarrito.get("/carrito/:id", getTrolleyByClientId);
apiCarrito.post("/carrito", postTrolley);
apiCarrito.delete("/carritodelete/:id", deleteItemTrolley);
apiCarrito.get("/carrito/confirmarcompra", confirmarCompra);

module.exports = { apiCarrito };
