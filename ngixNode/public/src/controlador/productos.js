const str = require("../utils/mocks");
const logger = require("../utils/loggers");
const { Contenedor } = require("../negocio/productos");
const containerProducts = new Contenedor();
/////////////////////////////////////////VARIABLE PARACREAR ADMIN
let userOrAdmin = true;
/////////////////////////////////////////
async function getApiProductos(req, res) {
  const todosLosItems = await containerProducts.getAll();
  res.status(201).json(todosLosItems);
}
async function getProductsRout(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const allItemsGet = await containerProducts.getAll();
    res.status(201).render("pages/productos", { allItems: allItemsGet });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function newApiProduct(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  try {
    const { body } = req;
    let newI = await containerProducts.save(body);
    res.status(201).json(newI);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function deleteElementInventary(req, res) {
  try {
    const { id } = req.params;
    const eliminated = await containerProducts.deleteById(id);
    res.status(202).json(eliminated);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function productsTest(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  res.render("pages/tablafaker", { stre: str() });
}
async function modificProduct(req, res) {
  const { id } = req.params;
  const { body } = req;
  const modify = await containerProducts.modifyElement(id, body);
  res.status(201).json(modify);
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
  modificProduct,
};
