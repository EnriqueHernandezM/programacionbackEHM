const logger = require("../utils/loggers");

function routIndex(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.render("pages/index", {
      imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg",
    });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function failRoute(req, res) {
  res.status(404).json();
  logger.log("warn", { ruta: req.path, metodo: req.route.methods, err: "ruta inexistente" });
}

module.exports = { routIndex, failRoute };
