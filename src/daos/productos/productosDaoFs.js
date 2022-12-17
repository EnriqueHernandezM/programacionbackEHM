const ContenedorFs = require("../../contenedores/contenedorFs");

class ProductosDaoFs extends ContenedorFs {
  constructor() {
    super("productos.json");
  }
}
module.exports = ProductosDaoFs;
