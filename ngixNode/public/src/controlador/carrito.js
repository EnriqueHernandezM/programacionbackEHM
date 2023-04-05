const logger = require("../utils/loggers");
const { ContainerTrolley } = require("../negocio/carrito");
const containerTrolley = new ContainerTrolley();

const getTrolleyByClientId = async (req, res) => {
  const { id } = req.params;
  const clientTrolley = await containerTrolley.getAllToTrolley(id);
  res.status(200).json({ clientTrolley });
};

const postTrolley = async (req, res) => {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  try {
    if (req.user) {
      const { body } = req;
      const idProduct = body.product;
      const addITrolley = await containerTrolley.addToCart(req.user._id, idProduct);
      res.status(202).json({ addITrolley });
    } else {
      res.status(403).json({ msge: "Al parecer aun no estas Logueado" });
      logger.log("info", "Al parecer aun no estas Logueado");
    }
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const deleteItemTrolley = async (req, res) => {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const { id } = req.params;
    const goToEliminate = await containerTrolley.deleteByIdAllTrolleyItem(req.user.idTrolley, id);
    res.json({ goToEliminate });
  } catch (err) {
    logger.log("error", `Error en controlador${err}`);
  }
};
async function confirmarCompra(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const dataCarrito = await containerTrolley.infoTrolley(req.user._id);
    await containerTrolley.comprarCarrito(dataCarrito);
    res.render("pages/confirmacion", {});
  } catch (err) {
    logger.log("error", `${err}`);
  }
}

module.exports = {
  getTrolleyByClientId,
  postTrolley,
  confirmarCompra,
  deleteItemTrolley,
};
