const { optionsLite } = require("./options/sqlite");
const knex = require("knex")(optionsLite);
const moment = require("moment");
const timestamp = moment().format("lll");
///
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./privi.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("conecte");
const db = getFirestore();
///
const { normalize, schema, denormalize } = require("normalizr");
/////
///
class ContenedorMsjes {
  constructor(table) {
    this.table = table;
  }
  async readMsgs() {
    const res = await db.collection("mensajes").get();

    if (res) {
      let arrayRes = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } else {
      return [];
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
      });
      console.log(res);
      let act = await this.readMsgs();
      return act;
    } catch {
      console.log(err);
    }
  }
  async normalizarMsges() {
    const mensajes = await this.readMsgs();
    const authorSchema = new schema.Entity("author");
    const messageSchema = new schema.Entity(
      "mensajes",
      {
        author: authorSchema,
      },
      { idAttribute: "id" }
    );
    const schemaAmandar = [messageSchema];

    const mensajesProces = mensajes.map((el) => ({
      author: el.author.idmail,
      id: el["id"],
      text: el.text,
    }));

    const normalizarOk = normalize(mensajesProces, schemaAmandar);

    // const denormalized = denormalize(normalizxado.result, posts, normalizxado.entities);
    console.log(JSON.stringify(normalizarOk, null, 4));
  }
}

module.exports = { ContenedorMsjes };
