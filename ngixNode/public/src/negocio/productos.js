const Joi = require("joi");
const logger = require("../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
const { DaoProductos } = require("../persistencia/DAOs");
class ContainerProducts {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  async save(product) {
    try {
      ContainerProducts.checkProduct(product);
      const items = await DaoProductos.saveNewProduct(product, timestamp);
      return { _id: items._id };
    } catch (err) {
      logger.log("error", `Error en negocio/productos${err}`);
      return { error: `Error en negocio/productos${err}` };
    }
  } /*  */
  async getById(number) {
    try {
      const datasRecived = await DaoProductos.getProductByIdDb(number);
      if (!datasRecived || datasRecived.error) {
        return { msge: "no existe un producto con ese id" };
      }
      return datasRecived;
    } catch (err) {
      logger.log("error", `Error en productos Negocio${err}`);
    }
  }
  async getAll() {
    try {
      return await DaoProductos.getAllitemsDb();
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  }
  async deleteById(aBorrar) {
    try {
      return await DaoProductos.deleteOneItemInventory(aBorrar);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async modifyElement(id, body) {
    try {
      ContainerProducts.checkProduct(body);
      const catchProductToModific = await this.getById(id);
      return await DaoProductos.modifyOneElementInventory(catchProductToModific, body);
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: `Error en negocio/productos${err}` };
    }
  }

  static checkProduct(product) {
    try {
      ContainerProducts.validar(product);
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
module.exports = { ContainerProducts };
