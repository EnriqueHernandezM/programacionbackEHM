const logger = require("../../utils/loggers");
const { Usuarios } = require("../mongoose/usuarios");
const { Schema, model } = require("mongoose");

const TrolleySchema = new Schema({
  idUser: { type: String },
  emailUser: { type: String, required: true, max: 100 },
  carrito: { type: Array },
  data: { type: Date, default: Date.now },
});
const Trolley = model("carritosCompras", TrolleySchema);

class ContainerCarritoMongo {
  constructor(collection) {
    this.collection = collection;
  }

  createOneNewTrolley = async (idMyUsuer) => {
    const catchMyUser = await Usuarios.findById(idMyUsuer);
    let theTrolley = {
      idUser: idMyUsuer,
      emailUser: catchMyUser.email,
      carrito: [],
    };
    Trolley.create(theTrolley, async (err, trolleyWithId) => {
      if (err) {
        logger.log("info", `Error en crear carrito mongo:${err}`);
      }
      if (trolleyWithId) {
        const addIdToUser = await Usuarios.updateOne(
          { _id: idMyUsuer },
          {
            $set: {
              idTrolley: trolleyWithId._id,
            },
          }
        );
      }
    });
    logger.log("info", `Se asigno un nuevo carrito`);
    return await Trolley.find({ idUser: idMyUsuer });
  };

  getAllTrolley = async (idTrolley) => {
    try {
      //LE ESTAMOS BUSCANDO POR id de carrito que en ususario viene como idTrolley
      const datas = await Trolley.find({ _id: idTrolley });
      return datas;
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  pushAunCarrito = async (idUser, catchProduct) => {
    try {
      const agregarItem = await Trolley.updateOne(
        { idUser: idUser },
        {
          $push: {
            carrito: catchProduct,
          },
        }
      );
      if (agregarItem.modifiedCount >= 1) {
        return { msge: "producto Correctamente afregado a carrito" };
      } else {
        return { msge: "Hubo un problema al agregar el producto" };
      }
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  borrarUnItemCarrito = async (idTrolley, carritoR) => {
    try {
      const agregarItem = await Trolley.updateOne(
        { _id: idTrolley },
        {
          $set: {
            carrito: carritoR,
          },
        }
      );
      if (agregarItem.modifiedCount > 0) {
        return { msge: "porducto eliminido de tu carrtio correctamente" };
      } else {
        return { msge: "ocurrio algu problema" };
      }
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  datosOneUser = async (idUsuario) => {
    try {
      return await Usuarios.find({ _id: idUsuario });
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
  datosCarrito = async (idUsuario) => {
    try {
      return await Trolley.find({ _id: idUsuario });
    } catch (err) {
      logger.log("error", `errInTrolleyMdb${err}`);
    }
  };
}

module.exports = { ContainerCarritoMongo, Trolley };
