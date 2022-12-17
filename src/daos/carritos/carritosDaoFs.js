const ContenedorFs = require("../../contenedores/contenedorFs");
class CarritoDeCompras extends ContenedorFs {
  constructor() {
    super("itemstrolley.json");
  }
}
module.exports = CarritoDeCompras;
