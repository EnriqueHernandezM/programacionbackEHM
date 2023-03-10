//KGsyd9An7Ol6WnrI2DdX
const { DaoUsuarios } = require("../persistencia/DAOs");
async function s() {
  console.log(await DaoUsuarios.getOneUserForEmail("qsb@hotmail.com"));
}

s();
//src/passport/prob.js
