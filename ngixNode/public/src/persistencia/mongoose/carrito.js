const logger = require("../../utils/loggers");
const Usuarios = require("../../models/usuarios");
class ContainerCarritoMongo {
  constructor(collection) {
    this.collection = collection;
  }
  getAllTrolley = async (idTrolley) => {
    try {
      const datas = await Usuarios.find({ email: idTrolley });
      return datas[0].carrito;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  pushAunCarrito = async (idUser, catchProduct) => {
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
  borrarUnItemCarrito = async (idTrolley, carrito) => {
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
  datosCarrito = async (idUsuario) => {
    try {
      return await Usuarios.find({ _id: idUsuario });
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}

module.exports = ContainerCarritoMongo;
