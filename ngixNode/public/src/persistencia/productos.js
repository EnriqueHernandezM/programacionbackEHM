const mongoose = require("mongoose");
const Productos = require("../models/productos");
const logger = require("../utils/loggers");
/* mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => logger.log("info", "Connected to Mongo  productos"))
  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  }) */ const guardarNuevoProducto = async (producto) => {
  try {
    const newProduct = new Productos(producto);
    await newProduct.save().then((data) => console.log(data));
  } catch (err) {
    logger.log("error", `${err}`);
    return { error: err };
  }
};
const traerProductoPorId = async (idNumber) => {
  //     this.connectMG();
  try {
    const datas = await Productos.find({});
    return datas;
  } catch (err) {
    logger.log("error", `${err}`);
    return { error: err };
  }
};
const traerTodosLosItems = async () => {
  try {
    const data = await Productos.find({});
    return data;
  } catch (err) {
    logger.log("error", `${err}`);
    return { error: err };
  }
};
const borrarItemInventario = async (aBorrar) => {
  try {
    Productos.deleteOne({ _id: aBorrar }).then(function () {
      logger.log("info", "productoEliminado");
    });
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const modificarUnElemento = async (buscar, body) => {
  try {
    const usuarioModificado = await this.Productos.updateOne(
      { codeItem: buscar.codeItem },
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
module.exports = { guardarNuevoProducto, traerProductoPorId, traerTodosLosItems, borrarItemInventario, modificarUnElemento };
