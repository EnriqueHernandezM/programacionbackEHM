const environmentVars = require("../utils/environmentVar");
//const CreateProductsSchema = require("../utils/joiSchema");
const Joi = require("joi");
const logger = require("../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
const { DaoProductos } = require("../persistencia/DAOs");
const { Productos } = require("../persistencia/mongoose/productos");
class Contenedor {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  async save(product) {
    try {
      Contenedor.checkProduct(product);
      const items = await DaoProductos.guardarNuevoProducto(product, timestamp);
      return { _id: items._id };
    } catch (err) {
      logger.log("error", `Error en negocio/productos${err}`);
      return { error: `Error en negocio/productos${err}` };
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
      return await DaoProductos.borrarItemInventario(aBorrar);
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
      Contenedor.checkProduct(body);
      const buscar = await this.getById(id);
      return await DaoProductos.modificarUnElemento(buscar, body);
      //logger.log("info", usuarioModificado);
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: `Error en negocio/productos${err}` };
    }
  }

  static checkProduct(product) {
    try {
      Contenedor.validar(product);
    } catch (err) {
      throw err;
    }
  }
  static validar(productR) {
    const CreateProductsSchema = Joi.object({
      product: Joi.string().required(),
      typeOfLiquor: Joi.string().required(),
      price: Joi.number().positive().required(),
      image: Joi.string().required(),
      description: Joi.string().required(),
      stockItems: Joi.number().integer().required(),
      codeItem: Joi.number().required(),
    });

    const { error } = CreateProductsSchema.validate(productR);
    if (error) {
      throw error;
    }
  }
}
module.exports = { Contenedor };
