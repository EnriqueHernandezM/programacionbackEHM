const logger = require("../utils/loggers");
const { ContenedorCarrito } = require("../negocio/carrito");
const containerCarrito = new ContenedorCarrito();
function getCreateAcount(req, res) {
  try {
    logger.log("info", { ruta: req.path, metodo: req.route.methods });
    if (req.isAuthenticated()) {
      res.render("pages/crearCuenta", {});
    } else {
      res.render("pages/crearCuenta", {});
    }
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function postCreateAcount(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    getLoguear(req, res);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function getLoguear(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    if (req.isAuthenticated()) {
      const l = await containerCarrito.getAllToTrolley(req.user.email);

      const user = req.user;
      let total = l.reduce((acc, el) => acc + el.price, 0);

      res.render("pages/formloguear", { sessionE: true, userE: user, total: total });
    } else {
      res.render("pages/formloguear", { sessionE: "esp" });
    }
  } catch (err) {
    logger.log("error", `${err}`);
  }
}

function postLoguear(req, res) {
  try {
    getLoguear(req, res);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
true;
function logOut(req, res) {
  try {
    let mdg = "hasta luego" + " " + req.user.email;
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    req.session.destroy((err) => {
      if (err) {
        res.send("algo salio mal en la pagina intenta de nuevo");
      } else {
        res.render("pages/formloguear", { sessionE: "desp", mdg: mdg });
      }
    });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}

module.exports = {
  getCreateAcount,
  postCreateAcount,
  getLoguear,
  postLoguear,
  logOut,
};
