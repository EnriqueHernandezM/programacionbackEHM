const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../../privi.json");
const db = getFirestore();
///
class ContainerMessagesFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  traerMensajesOredenadoPorFecha = async () => {
    const mensajesPorFecha = await db.collection(this.collection).orderBy("time", "asc").get();
    if (mensajesPorFecha) {
      let arrayRes = mensajesPorFecha.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    }
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    let res;
    res = await db.collection(this.collection).doc().set({
      author: author1,
      text: text1,
      time: timestamp,
    });
    return res;
  };
}

module.exports = ContainerMessagesFirebas;
/* container firebas i ts ready , lack monggose and memory the constructor recived collection mensajes*/
