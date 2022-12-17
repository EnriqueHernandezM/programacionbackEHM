const ContenedorMemory = require("../../contenedores/contenedorMemoria");

class CarritoMemory extends ContenedorMemory {
  constructor() {
    super("arrayDeCarritos");
  }
}

module.exports = CarritoMemory;
