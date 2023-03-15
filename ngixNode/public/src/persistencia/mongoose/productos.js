const logger = require("../../utils/loggers");
const { Schema, model } = require("mongoose");
require("../../utils/databasConecctions/mongoose");

const ProductoSchema = new Schema({
  product: { type: String, required: true, max: 100 },
  typeOfLiquor: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  image: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  stockItems: { type: Number, required: true },
  codeItem: { type: Number, required: true },
  data: Date,
});
const Productos = model("inventario", ProductoSchema);

class ContainerProductMongo {
  constructor(collection) {
    this.collecton = collection;
  }
  guardarNuevoProducto = async (product, timestamp) => {
    try {
      product.data = timestamp;
      const newProduct = new Productos(product);
      return await newProduct.save().then((data) => {
        console.log(data);
        return data;
      });
    } catch (err) {
      logger.log("error", `errInProductMdb${err}`);
      return { error: err };
    }
  };
  traerProductoPorId = async (idNumber) => {
    try {
      const datas = await Productos.find({});
      return datas.find((el) => el._id == idNumber);
    } catch (err) {
      logger.log("error", `errInProductMdb${err}`);
      return { error: err };
    }
  };
  traerTodosLosItems = async () => {
    try {
      const data = await Productos.find({});
      return data;
    } catch (err) {
      logger.log("error", `errInProductMdb${err}`);
      return { error: err };
    }
  };
  borrarItemInventario = async (aBorrar) => {
    try {
      Productos.deleteOne({ _id: aBorrar }).then(function () {
        logger.log("info", "productoEliminado");
      });
    } catch (err) {
      logger.log("error", `errInProductMdb${err}`);
    }
  };
  modificarUnElemento = async (buscar, body) => {
    try {
      const usuarioModificado = await Productos.updateOne(
        { _id: buscar._id },
        {
          $set: {
            product: body.product,
            typeOfLiquor: body.typeOfLiquor,
            price: body.price,
            image: body.image,
            description: body.description,
            stockItems: body.stockItems,
            codeItem: body.codeItem,
          },
        }
      );
      if (usuarioModificado.modifiedCount > 0) {
      }
      return await this.traerProductoPorId(buscar.id);
    } catch (err) {
      logger.log("error", `errInProductMdb${err}`);
    }
  };
}
module.exports = { ContainerProductMongo, Productos };
