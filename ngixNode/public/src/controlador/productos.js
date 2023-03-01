const str = require("../contenedores/mocks");
const logger = require("../utils/loggers");
const { Contenedor } = require("../negocio/productos");
const containerProducts = new Contenedor();

async function getApiProductos(req, res) {
  const todosLosItems = await containerProducts.getAll();
  res.json(todosLosItems);
}
function getProductsRout(req, res) {
  try {
    //res.send("bnjjun");
    res.render("pages/productos", {});
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
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
};
