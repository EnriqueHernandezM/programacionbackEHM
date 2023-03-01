const logger = require("../utils/loggers");

function routIndex(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    let veces;
    let email = "";
    if (req.user) {
      email = req.user.email;
    }
    if (req.session.cont) {
      req.session.cont++;
      veces = req.session.cont;
    } else {
      req.session.cont = 1;
      veces = +1;
    }

    res.render("pages/index", {
      saludo: `bienvenido ${email} a esta gran vinateria`,
      imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg",
      visitas: veces,
    });
  } catch (err) {
    logger.log("error", `${err}`);
  }
}

module.exports = routIndex;
