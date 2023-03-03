const str = require("../utils/mocks");
const logger = require("../utils/loggers");
const { Contenedor } = require("../negocio/productos");
const containerProducts = new Contenedor();
/////////////////////////////////////////VARIABLE PARACREAR ADMIN
let userOrAdmin = true;
//////////////////////
async function getApiProductos(req, res) {
  const todosLosItems = await containerProducts.getAll();
  res.json(todosLosItems);
}
async function getProductsRout(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const allItemsGet = await containerProducts.getAll();
    res.render("pages/productos", { allItems: allItemsGet });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function newApiProduct(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  /*  if (userOrAdmin === true) {
    next();
  } else {
    return res.status(404).json({ error: true, description: "solo admin" });
  } */
  try {
    const { body } = req;
    await containerProducts.save(body);
    res.json({ ok: "producto agregado correctamente" });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function deleteElementInventary(req, res) {
  try {
    const { id } = req.params;
    await containerProducts.deleteById(id);
    res.json({ eliminated: "ok" });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function productsTest(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  res.render("pages/tablafaker", { stre: str() });
}

//////////////////////////////////////FUNCIONES ENTREGA OBJECT PROCESS

function failRoute(req, res) {
  try {
    logger.log("warn", { ruta: req.path, metodo: req.route.methods, err: "ruta inexistente" });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}

module.exports = {
  getProductsRout,
  productsTest,
  getApiProductos,
  failRoute,
  newApiProduct,
  deleteElementInventary,
};
