const environmentVars = require("../utils/environmentVar");
const logger = require("../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
const { DaoProductos } = require("../persistencia/DAOs");
class Contenedor {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  async connectMG() {
    try {
      await connect(environmentVars.mongoDb);
      logger.log("info", "conecte bse de datos Productos");
    } catch (err) {
      logger.log("error", `${err}`);
      throw "can not connect to the db";
    }
  }
  async save(product) {
    try {
      await DaoProductos.guardarNuevoProducto(product, timestamp);
      return this.getAll();
    } catch (err) {
      logger.log("error", `${err}`);
    }
  } /*  */
  async getById(number) {
    try {
      const datasRecived = await DaoProductos.traerProductoPorId(number);
      return datasRecived;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async getAll() {
    try {
      return await DaoProductos.traerTodosLosItems();
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  }
  async deleteById(aBorrar) {
    try {
      await DaoProductos.borrarItemInventario(aBorrar);
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
      const usuarioModificado = await DaoProductos.modificarUnElemento(buscar, body);
      logger.log("info", usuarioModificado);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}
module.exports = { Contenedor };
