const ContenedorMemory = require("../../contenedores/contenedorMemoria");

class ProductosMemory extends ContenedorMemory {
  constructor() {
    super("arrayDeProductos");
  }
}
module.exports = ProductosMemory;
