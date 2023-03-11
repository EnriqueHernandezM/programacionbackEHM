const ContainerProductFirebas = require("./firebas/productos");
const { ContainerProductMongo } = require("./mongoose/productos");
const ContainerCarritoMongo = require("./mongoose/carrito");
const ContainerCarritoFirebas = require("./firebas/carrito");
const ContainerMessagesFirebas = require("./firebas/mensajes");
const ContainerMessagesMongo = require("./mongoose/mensajes");
const { ContainerUsuariosMongo } = require("./mongoose/usuarios");
const ContainerUsuariosFirebas = require("./firebas/usuarios");
const { ContainerProductMem } = require("./memory/productos");
const ContainerMessagesMem = require("./memory/mensajes");
const ContainerUsuariosMem = require("./memory/usuarios");
const ContainerCarritoMem = require("./memory/carrito");
let DaoProductos;
let DaoCarrito;
let DaoUsuarios;
let DaoMensajes;

const dataBasForConsole = process.argv[3];
if (dataBasForConsole === "mongo") {
  DaoProductos = new ContainerProductMongo();
  DaoCarrito = new ContainerCarritoMongo();
  DaoUsuarios = new ContainerUsuariosMongo();
  DaoMensajes = new ContainerMessagesMongo();
}
if (dataBasForConsole === "firebas") {
  DaoProductos = new ContainerProductFirebas("inventarios");
  DaoCarrito = new ContainerCarritoFirebas("usuarios");
  DaoUsuarios = new ContainerUsuariosFirebas();
  DaoMensajes = new ContainerMessagesFirebas("mensajes");
}
if (dataBasForConsole === "mem") {
  DaoProductos = new ContainerProductMem();
  DaoMensajes = new ContainerMessagesMem();
  DaoUsuarios = new ContainerUsuariosMem();
  DaoCarrito = new ContainerCarritoMem();
}
module.exports = { DaoProductos, DaoCarrito, DaoUsuarios, DaoMensajes };
