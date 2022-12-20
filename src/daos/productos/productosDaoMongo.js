const ContenedorMongo = require("../../contenedores/contenedorMongo");
class ProductosMongo extends ContenedorMongo {
  constructor() {
    super("Productos");
  }
}

module.exports = ProductosMongo;
