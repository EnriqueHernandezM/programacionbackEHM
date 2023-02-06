const moment = require("moment");
const timestamp = moment().format("lll");
///
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../privi.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("conecte");
const db = getFirestore();
///
const { normalize, schema } = require("normalizr");
/////
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "idmail" });
const messageSchema = new schema.Entity("texts", {
  author: authorSchema,
});

const messageSchemaOk = [messageSchema];
///
class ContenedorMsjes {
  constructor(table) {
    this.table = table;
  }
  async readMsgs() {
    try {
      const res = await db.collection("mensajes").orderBy("time", "asc").get();
      if (res) {
        let arrayRes = res.docs.map((item) => {
          return { id: item.id, ...item.data() };
        });
        return arrayRes;
      } else {
        return [], { err: true, msg: "sin mensajes" };
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async saveMsges(mensaje) {
    try {
      const author1 = { idmail: mensaje.idmail, avatar: mensaje.avatar, nombre: mensaje.nombre, apellido: mensaje.apellido, edad: mensaje.edad, alias: mensaje.alias };
      let text1 = mensaje.text;
      let res;

      res = await db.collection("mensajes").doc().set({
        author: author1,
        text: text1,
        time: timestamp,
      });
      console.log(res);
      let act = await this.readMsgs();
      return act;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }

  normalizarMsges(msgRec) {
    try {
      const normalizarOk = normalize(msgRec, messageSchemaOk);
      // const denormalized = denormalize(normalizxado.result, posts, normalizxado.entities);
      console.log(JSON.stringify(normalizarOk, null, 4));
      return normalizarOk;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}

module.exports = { ContenedorMsjes };
