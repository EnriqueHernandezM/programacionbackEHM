const logger = require("../../utils/loggers");

const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../../privi.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
logger.log("info", "conecte base firebass");
const db = getFirestore();
class ContainerProductFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  guardarNuevoProducto = async (product, timestamp) => {
    try {
      console.log(product);
      const newProduct = await db.collection("inventarios").doc().set({
        codeItem: product.codeItem,
        data: timestamp,
        description: product.description,
        image: product.image,
        price: product.price,
        product: product.product,
        stockItems: product.stockItems,
        typeOfLiquor: product.typeOfLiquor,
      });
      logger.log("info", `${newProduct}`);
      return newProduct;
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
  traerProductoPorId = async (idNumber) => {
    try {
      const datas = await db.collection("inventarios").get();
      let arrayRes = datas.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes.find((el) => el.id == idNumber);
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
  traerTodosLosItems = async () => {
    try {
      const products = await db.collection("inventarios").get();
      let arrayRes = products.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };

  borrarItemInventario = async (aBorrar) => {
    try {
      await db
        .collection(this.collection)
        .doc(aBorrar)
        .delete()
        .then(function () {
          logger.log("info", "productoEliminado");
        });
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  modificarUnElemento = async (buscar, body) => {
    try {
      const usuarioModificado = await db.collection("inventarios").doc(buscar.id).set(
        {
          product: body.product,
          typeOfLiquor: body.typeOfLiquor,
          price: body.price,
          image: body.image,
          description: body.description,
          stockItems: body.stockItems,
          codeItem: body.codeItem,
        },
        { merge: true }
      );
      return usuarioModificado;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}

module.exports = ContainerProductFirebas;
