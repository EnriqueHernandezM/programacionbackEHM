const ContenedorMongo = require("../../contenedores/contenedorMongo");

class CarritoMongo extends ContenedorMongo {
  constructor() {
    super("carritos");
  }
}

module.exports = CarritoMongo;
