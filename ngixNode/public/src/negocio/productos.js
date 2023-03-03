const { config } = require("dotenv");
const logger = require("../utils/loggers");
const { guardarNuevoProducto, traerProductoPorId, traerTodosLosItems, borrarItemInventario } = require("../persistencia/productos");
config();

class Contenedor {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  async connectMG() {
    try {
      await connect(process.env.DATABAS);
      logger.log("info", "conecte bse de datos Productos");
    } catch (err) {
      logger.log("error", `${err}`);
      throw "can not connect to the db";
    }
  }
  async save(product) {
    try {
      const data = new Date();
      product.data = data;
      await guardarNuevoProducto(product);
      return this.getAll();
    } catch (err) {
      logger.log("error", `${err}`);
    }
  } /*  */
  async getById(number) {
    try {
      const datasRecived = await traerProductoPorId(number);
      return datasRecived.find((el) => el._id == number);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async getAll() {
    try {
      return await traerTodosLosItems();
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  }
  async deleteById(aBorrar) {
    try {
      await borrarItemInventario(aBorrar);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async deleteAll() {
    try {
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async modifyElement(id, body) {
    try {
      const buscar = await this.getById(id);
      const usuarioModificado = await modificarUnElemento(buscar, body);
      logger.log("info", usuarioModificado);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}
module.exports = { Contenedor };
