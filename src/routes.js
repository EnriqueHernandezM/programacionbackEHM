const str = require("../src/contenedores/mocks");

function failRoute(req, res) {
  res.status(404).render("routing-error", {});
}

function routIndex(req, res) {
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
  res.render("pages/index", { saludo: `bienvenido ${email} a esta gran vinateria`, imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg", visitas: veces });
}
function getProductsRout(req, res) {
  res.render("pages/productos", {});
}
function productsTest(req, res) {
  res.render("pages/tablafaker", { stre: str() });
}

function getCreateAcount(req, res) {
  if (req.isAuthenticated()) {
    const { email, password } = req.body;
    const user = { email, password };
    console.log(user);
    res.render("pages/crearCuenta", {});
  } else {
    res.render("pages/crearCuenta", {});
  }
}
function postCreateAcount(req, res) {
  const { email, password } = req.body;
  const user = { email, password };
  res.render("pages/confirmCountCreate", {});
}
function getLoguear(req, res) {
  if (req.isAuthenticated()) {
    const { email, password } = req.user;
    const user = { email, password };
    res.render("pages/formloguear", { sessionE: true, userE: user.email });
  } else {
    res.render("pages/formloguear", { sessionE: "esp" });
  }
}

function postLoguear(req, res) {
  const { email, password } = req.body;
  const user = { email, password };
  console.log(user);
  return res.render("pages/index", { sessionE: true, userE: user.email });
}
function logOut(req, res) {
  let mdg = "hasta luego" + " " + req.user.email;
  req.session.destroy((err) => {
    if (err) {
      res.send("algo salio mal en la pagina intenta de nuevo");
    } else {
      res.render("pages/formloguear", { sessionE: "desp", mdg: mdg });
    }
  });
}
function info(req, res) {
  // const argEntrda = "";
  const sistemaOperativo = process.platform;
  const nodeJsVersion = process.version;
  const rss = process.memoryUsage();
  const patEjecucion = process.execPath;
  const processId = process.pid;
  const carpetaProyecto = process.cwd();
  const info = {
    "sistema Operativo": sistemaOperativo,
    "carpeta del proyecto": carpetaProyecto,
    "ID  del proceso": processId,
    "version node JS": nodeJsVersion,
    "uso de la memoria": rss,
    "path de ejecucion": patEjecucion,
  };
  res.json(info);
}
function apiRandoms(req, res) {}
module.exports = {
  apiRandoms,
  failRoute,
  routIndex,
  getProductsRout,
  productsTest,
  getCreateAcount,
  postCreateAcount,
  getLoguear,
  postLoguear,
  logOut,
  info,
};
