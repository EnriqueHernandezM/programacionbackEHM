const logger = require("../../utils/loggers");
const { Usuarios } = require("../mongoose/usuarios");
class ContainerCarritoMongo {
  constructor(collection) {
    this.collection = collection;
  }
  getAllTrolley = async (idTrolley) => {
    try {
      const datas = await Usuarios.find({ email: idTrolley });
      return datas[0].carrito;
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  pushAunCarrito = async (idUser, catchProduct) => {
    try {
      const agregarItem = await Usuarios.updateOne(
        { email: idUser },
        {
          $push: {
            carrito: catchProduct,
          },
        }
      );
      return agregarItem;
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  borrarUnItemCarrito = async (idTrolley, carrito, idUser) => {
    try {
      const agregarItem = await Usuarios.updateOne(
        { _id: idUser },
        {
          $set: {
            carrito: carrito,
          },
        }
      );
      return agregarItem;
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  datosCarrito = async (idUsuario) => {
    try {
      return await Usuarios.find({ email: idUsuario });
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
}

module.exports = ContainerCarritoMongo;
