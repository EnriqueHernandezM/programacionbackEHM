const logger = require("../../utils/loggers");
const { Schema, model } = require("mongoose");

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

  guardarNuevoProducto = async (product) => {
    try {
      const newProduct = new Productos(product);
      await newProduct.save().then((data) => console.log(data));
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
  traerProductoPorId = async (idNumber) => {
    try {
      const datas = await Productos.find({});
      return datas.find((el) => el._id == idNumber);
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
  traerTodosLosItems = async () => {
    try {
      const data = await Productos.find({});
      return data;
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
  borrarItemInventario = async (aBorrar) => {
    try {
      Productos.deleteOne({ _id: aBorrar }).then(function () {
        logger.log("info", "productoEliminado");
      });
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  modificarUnElemento = async (buscar, body) => {
    try {
      const usuarioModificado = await this.Productos.updateOne(
        { _id: buscar._id },
        {
          $set: {
            producto: body.producto,
            precio: body.precio,
            imagen: body.imagen,
            description: body.description,
            stockItems: body.stockItems,
            codeItem: body.stockItems,
          },
        }
      );
      return usuarioModificado;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}
module.exports = { ContainerProductMongo, Productos };
