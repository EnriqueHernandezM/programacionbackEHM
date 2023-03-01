const moment = require("moment");
const timestamp = moment().format("lll");
const logger = require("../utils/loggers");
///
const { traerMensajesOredenadoPorFecha, guardarNuevoMensaje } = require("../persistencia/mensajes");
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
      const res = await traerMensajesOredenadoPorFecha();
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
      const author1 = {
        idmail: mensaje.idmail,
        avatar: mensaje.avatar,
        nombre: mensaje.nombre,
        apellido: mensaje.apellido,
        edad: mensaje.edad,
        alias: mensaje.alias,
      };
      let text1 = mensaje.text;
      const saveMsgDtb = await guardarNuevoMensaje(author1, text1, timestamp);
      logger.log("info", `${saveMsgDtb}`);
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
      logger.log("info", `${JSON.stringify(normalizarOk, null, 4)}`);
      return normalizarOk;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}

module.exports = { ContenedorMsjes };
