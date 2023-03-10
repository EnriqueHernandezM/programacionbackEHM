const admin = require("firebase-admin");
/* const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../../privi.json");
const logger = require("../../utils/loggers");
///
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
logger.log("info", "conecte base firebass");
const db = getFirestore(); */
class ContainerUsuariosFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForId = async (id, done) => {
    const datas = await db.collection("usuarios").doc(id, done).get();
    return datas.data();
  };
}
module.exports = ContainerUsuariosFirebas;
