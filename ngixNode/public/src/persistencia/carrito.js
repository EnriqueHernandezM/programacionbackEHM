const mongoose = require("mongoose");
const Usuarios = require("../models/usuarios");
const Productos = require("../models/productos");
const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();
/* 
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => logger.log("info", "Connected to Mongo  productos"))

  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  }); */

const traerProductoParaCarrito = async () => {
  try {
    const producto = await Productos.find({});
    return producto;
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const pushAunCarrito = async (idUser, catchProduct) => {
  try {
    const agregarItem = await Usuarios.updateOne(
      { _id: idUser },
      {
        $push: {
          carrito: catchProduct,
        },
      }
    );
    return agregarItem;
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const borrarUnItemCarrito = async (idTrolley, carrito) => {
  try {
    const agregarItem = await Usuarios.updateOne(
      { _id: idTrolley },
      {
        $set: {
          carrito: carrito,
        },
      }
    );
    return agregarItem;
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const datosCarrito = async (idUsuario) => {
  try {
    return await Usuarios.find({ _id: idUsuario });
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
module.exports = { traerProductoParaCarrito, pushAunCarrito, borrarUnItemCarrito, datosCarrito };
