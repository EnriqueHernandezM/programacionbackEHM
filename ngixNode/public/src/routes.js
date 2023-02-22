const str = require("../src/contenedores/mocks");
const logger = require("./utils/loggers");
const { ContenedorCarrito } = require("../src/contenedores/appcarrito");
const containerCarrito = new ContenedorCarrito();
const enviarcorreo = require("./utils/nodemailer");
const { Contenedor } = require("../src/contenedores/app");
const containerProducts = new Contenedor("productos");
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
async function getApiProductos(req, res) {
  const todosLosItems = await containerProducts.getAll();
  res.json(todosLosItems);
}
function getProductsRout(req, res) {
  try {
    res.render("pages/productos", {});
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  } catch (err) {
    logger.log("error", `${err}`);
  }
  00;
}
function productsTest(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  res.render("pages/tablafaker", { stre: str() });
}
function getCreateAcount(req, res) {
  try {
    logger.log("info", { ruta: req.path, metodo: req.route.methods });
    if (req.isAuthenticated()) {
      const { email, password } = req.body;
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
    res.render("pages/formloguear", {});
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function getLoguear(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    if (req.isAuthenticated()) {
      const user = req.user;
      const total = user.carrito.reduce((acc, el) => acc + el.precio, 0);
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
//////////////////////////////////////FUNCIONES ENTREGA OBJECT PROCESS
function info(req, res) {
  // const argEntrda = "";
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
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
    res.json(info);
    return info;
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function infoConLog(req, res) {
  try {
    console.log(info(req, res));
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
function apiRandoms(req, res) {
  try {
    const limite = req.query;
    /////////////////////////////////////////////CHILD PROCEES SE ELIMINA
    /* const operacioAleatoria = fork("src/contenedores/operacionAleatoria.js");
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
      case "otra cosa": */
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    let sum = [];
    let operador = limite || 1000000;
    for (let i = 0; i < operador; i++) {
      sum.push(random(1, 1000));
    }
    res.end(`La data es ${sum}`);
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
async function postTrolley(req, res) {
  logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
  try {
    if (req.user) {
      const { body } = req;
      const idProduct = body.product;
      await containerCarrito.addToCart(req.user._id, idProduct);
    } else {
      logger.log("info", "Al parecer aun no estas Loguead");
    }
  } catch (err) {}
}
async function confirmarCompra(req, res) {
  try {
    logger.log("info", { ruta: req.originalUrl, metodo: req.route.methods });
    const dataCarrito = await containerCarrito.comprarCarrito(req.user._id);

    let pedido = [];
    dataCarrito.carrito.forEach((el) => {
      pedido.push(el.producto);
    });
    await containerCarrito.enviarMsg(dataCarrito, pedido);
    containerCarrito.enviarWats(dataCarrito.nombre);
    const mailOptionsConfirm = {
      from: `Servidor Node. JackVinaterias`,
      to: process.env.CORREOSERVICEME,
      subject: `Nuevo Pedido de ${dataCarrito.nombre}`,
      html: `<div>
       <h1 style="color: black;">Hola has recibido un nuevo pedido</h1>
        <h1 style="color: blue;">Email Usuario <span style="color: green;">${dataCarrito.email}</span></h1>
          <h1 style="color: blue;"> telefono Contacto<span style="color: green;">${dataCarrito.telefono}</span></h1>
          <h1 style="color: blue;">Direccion <span style="color: green;">${dataCarrito.direccion}</span></h1>
          <h1 style="color: blue;">productos:<span style="color: green;">${pedido}</span></h1>
      </div>
      `,
    };
    enviarcorreo(mailOptionsConfirm);
    res.render("pages/confirmacion", {});
  } catch (err) {
    logger.log("error", `${err}`);
  }
}
//////Carrito de compras
function failRoute(req, res) {
  logger.log("warn", { ruta: req.path, metodo: req.route.methods, err: "ruta inexistente" });
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
  infoConLog,
  postTrolley,
  confirmarCompra,
  getApiProductos,
  failRoute,
};
