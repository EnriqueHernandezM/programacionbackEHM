const logger = require("../../utils/loggers");

class ContainerCarritoMongo {
  constructor() {}

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
