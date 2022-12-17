const ContenedorMongo = require("../../contenedores/contenedorMongo");

class CarritoMongo extends ContenedorMongo {
  constructor() {
    super("aqui va el url para conectar a mongo atlas");
  }
}

module.exports = CarritoMongo;
