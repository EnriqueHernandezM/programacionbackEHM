const express = require("express");
const { Router } = express;
const apiCarrito = new Router();
const carrito = new Router();
const { postTrolley, confirmarCompra, deleteItemTrolley } = require("../controlador/carrito");

apiCarrito.post("/carrito", postTrolley);
apiCarrito.delete("/carritodelete/:id", deleteItemTrolley);
carrito.get("/confirmarcompra", confirmarCompra);

module.exports = { carrito, apiCarrito };
