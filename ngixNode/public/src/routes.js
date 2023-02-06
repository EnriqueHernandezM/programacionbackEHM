const str = require("../src/contenedores/mocks");
////////////////////////////////////////////REQUERIMOS PARA USAR CHILD PROCES
const { fork } = require("child_process");
const logger = require("./utils/loggers");

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
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
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
  logger.log("info", { ruta: req.path, metodo: req.route.methods });
}
function postCreateAcount(req, res) {
  res.render("pages/confirmCountCreate", {});
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
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
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  return res.render("pages/index", { sessionE: true, userE: user.email });
}
function logOut(req, res) {
  let mdg = "hasta luego" + " " + req.user.email;
  req.session.destroy((err) => {
    if (err) {
      res.send("algo salio mal en la pagina intenta de nuevo");
    } else {
      logger.log("info", { ruta: req.originalUrl, metodo: req.route });
      res.render("pages/formloguear", { sessionE: "desp", mdg: mdg });
    }
  });
}
//////////////////////////////////////FUNCIONES ENTREGA OBJECT PROCESS
function info(req, res) {
  // const argEntrda = "";
  const sistemaOperativo = process.platform;
  const nodeJsVersion = process.version;
  const rss = process.memoryUsage();
  const patEjecucion = process.execPath;
  const processId = process.pid;
  const carpetaProyecto = process.cwd();
  const puerto = parseInt(process.argv[2]);
  const info = {
    "sistema Operativo": sistemaOperativo,
    "carpeta del proyecto": carpetaProyecto,
    "ID  del proceso": processId,
    "version node JS": nodeJsVersion,
    "uso de la memoria": rss,
    "path de ejecucion": patEjecucion,
    " en uso": puerto,
  };

  logger.log("info", { ruta: req.path, metodo: req.route.methods });
  res.json(info);
}
function apiRandoms(req, res) {
  const limite = req.query;
  const operacioAleatoria = fork("src/contenedores/operacionAleatoria.js");
  operacioAleatoria.send(limite); //////le mando esta variable como mensaje
  operacioAleatoria.on("message", (msg) => {
    const { data, type } = msg;
    switch (type) {
      case "sum":
        if (parseInt(process.argv[2]) == 8081) {
          logger.log("info", `Worker ${process.pid} started`);
        }
        let x = { veces: limite, puerto: parseInt(process.argv[2]), claves: data };
        res.json(x);
        break;
      case "otra cosa":
        res.end(`La data es ${data}`);
        break;
    }
  });
}
function failRoute(req, res) {
  logger.log("warn", { ruta: req.path, metodo: req.route.methods, err: "ruta inexistente" });
  logger.log("error", "127.0.0.1 - log warn");
}
module.exports = {
  apiRandoms,
  routIndex,
  getProductsRout,
  productsTest,
  getCreateAcount,
  postCreateAcount,
  getLoguear,
  postLoguear,
  logOut,
  info,
  failRoute,
};
