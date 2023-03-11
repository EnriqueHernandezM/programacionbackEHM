const logger = require("../../utils/loggers");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

class ContainerCarritoFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  getAllTrolley = async (idTrolley) => {
    try {
      const datas = await db.collection(this.collection).where("email", "==", idTrolley).get();
      let arrayRes = datas.docs.map((item) => {
        return item.data();
      });
      return arrayRes[0].carrito;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  traerProductoParaCarrito = async (number) => {
    try {
      const oneProduct = await db.collection("inventarios").get();
      let res = oneProduct.find((el) => el.id == number);
      return res;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  pushAunCarrito = async (idUser, catchProduct, idUserF) => {
    try {
      const Act = await this.getAllTrolley(idUser);
      const acumuladorProductos = [];
      acumuladorProductos.push(catchProduct, ...Act);
      let agregar = await db.collection(this.collection).doc(idUserF).update({ carrito: acumuladorProductos });
      return agregar;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  borrarUnItemCarrito = async (idTrolley, carrito, idUser) => {
    try {
      console.log(idUser);
      const Act = await this.getAllTrolley(idTrolley);
      let trolleyDelete = Act.find((el) => el.id == carrito);
      Act.splice(trolleyDelete, 1);

      let agregar = await db.collection(this.collection).doc(idUser).update({ carrito: Act });
      return agregar;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
  datosCarrito = async (idUsuario) => {
    try {
      const datas = await db.collection(this.collection).where("email", "==", idUsuario).get();
      let arrayRes = datas.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `errInTroleyFB${err}`);
    }
  };
}

module.exports = ContainerCarritoFirebas;
