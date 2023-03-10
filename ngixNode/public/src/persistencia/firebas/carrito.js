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
      const Act = await this.getAllTrolley(idUser);
      const acumuladorProductos = [];
      acumuladorProductos.push(catchProduct, ...Act);
      let agregar = await db.collection("usuarios").doc("2zZc3pwRXKnK1Oxp6vmy").update({ carrito: acumuladorProductos });
      return agregar;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  borrarUnItemCarrito = async (idTrolley, carrito, idUser) => {
    try {
      console.log(idUser);
      const Act = await this.getAllTrolley(idTrolley);
      let trolleyDelete = Act.find((el) => el.id == carrito);
      Act.splice(trolleyDelete, 1);

      let agregar = await db.collection("usuarios").doc(idUser).update({ carrito: Act });
      return agregar;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  datosCarrito = async (idUsuario) => {
    try {
      const datas = await db.collection("usuarios").where("email", "==", idUsuario).get();
      let arrayRes = datas.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}

module.exports = ContainerCarritoFirebas;
