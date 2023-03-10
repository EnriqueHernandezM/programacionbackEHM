const logger = require("../utils/loggers");
const { ContenedorCarrito } = require("../negocio/carrito");
const containerCarrito = new ContenedorCarrito();

async function postTrolley(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  try {
    if (req.user) {
      const { body } = req;
      const idProduct = body.product;
      await containerCarrito.addToCart(req.user.email, idProduct);
    } else {
      logger.log("info", "Al parecer aun no estas Loguead");
    }
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function confirmarCompra(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const dataCarrito = await containerCarrito.infoCarrito(req.user._id);
    await containerCarrito.comprarCarrito(dataCarrito);
    res.render("pages/confirmacion", {});
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function deleteItemTrolley(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const { id } = req.params;
    await containerCarrito.deleteByIdAllTrolleyItem(req.user.email, id);
    res.json({ eliminated: "ok" });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
module.exports = {
  postTrolley,
  confirmarCompra,
  deleteItemTrolley,
};
