function getFaillogin(req, res) {
  res.render("login-error", {});
}

function getFailsignup(req, res) {
  res.render("signup-error", {});
}

function failRoute(req, res) {
  res.status(404).render("routing-error", {});
}
/////////////////////////////////////////FUNCIONES MIAS
function routIndex(req, res) {
  let veces;
  if (req.session.cont) {
    req.session.cont++;
    veces = req.session.cont;
  } else {
    req.session.cont = 1;
    veces = +1;
  }
  res.render("pages/index", { saludo: "bienvenido a esta gran vinateria", imagen: "https://i.ytimg.com/vi/WGrX46hqSCc/maxresdefault.jpg", visitas: veces });
}
function getProductsRout(req, res) {
  res.render("pages/productos", {});
}
function productsTest(req, res) {
  res.render("pages/tablafaker", { stre: str() });
}

function getCreateAcount(req, res) {
  if (req.isAuthenticated()) {
    const { email, password } = req.user;
    const user = { email, password };
    console.log(user);
    res.render("pages/crearCuenta", {});
  } else {
    res.render("pages/crearCuenta", {});
  }
}
function postCreateAcount(req, res) {
  console.log("ohwidfhiuwdhfuowdhfvouwefouehfouehfgou");
  const { email, password } = req.body;
  const user = { email, password };
  console.log(user);
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
  return res.render("pages/formloguear", { sessionE: false });
}
function logOut(req, res) {
  let mdg = "hata luego" + " " + req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("algo salio mal en la pagina intenta de nuevo");
    } else {
      res.render("pages/formloguear", { sessionE: "desp", mdg: mdg });
    }
  });
}
module.exports = {
  getFaillogin,
  getFailsignup,
  failRoute,
  routIndex,
  getProductsRout,
  productsTest,
  getCreateAcount,
  postCreateAcount,
  getLoguear,
  postLoguear,
  logOut,
};
