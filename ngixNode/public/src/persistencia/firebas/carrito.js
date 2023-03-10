const logger = require("../../utils/loggers");
const { Usuarios } = require("../mongoose/usuarios");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
class ContainerCarritoFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  getAllTrolley = async (idTrolley) => {
    try {
      const datas = await db.collection("usuarios").where("email", "==", idTrolley).get();

      let arrayRes = datas.docs.map((item) => {
        return item.data();
      });
      return arrayRes[0].carrito;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  traerProductoParaCarrito = async (number) => {
    try {
      const oneProduct = await db.collection("inventarios").get();
      let res = oneProduct.find((el) => el.id == number);
      return res;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  pushAunCarrito = async (idUser, catchProduct) => {
    try {
      const agregarItem = await Usuarios.updateOne(
        { id: idUser },
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

module.exports = ContainerCarritoFirebas;
