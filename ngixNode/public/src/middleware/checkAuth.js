const logger = require("../utils/loggers");
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    res.redirect("/perfil/login");
  }
}

module.exports = checkAuthentication;
