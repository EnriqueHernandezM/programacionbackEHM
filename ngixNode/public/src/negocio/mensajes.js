const moment = require("moment");
const timestamp = moment().format("lll");
const logger = require("../utils/loggers");
const { DaoMensajes } = require("../persistencia/DAOs");
const { normalize, schema } = require("normalizr");
const { Usuarios } = require("../persistencia/mongoose/usuarios");
const usuarios = require("../utils/createUserParallel");
let infoUser;
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "idmail" });
const messageSchema = new schema.Entity("texts", {
  author: authorSchema,
});

const messageSchemaOk = [messageSchema];
///
class ContenedorMsjes {
  constructor() {}
  async readMsgs() {
    try {
      const res = await DaoMensajes.traerMensajesOredenadoPorFecha();
      if (res) {
        console.log(res);
        return res;
      } else {
        console.log(res);
        return [], { err: true, msg: "sin mensajes" };
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async infoUserToChat(infUser) {
    try {
      infoUser = infUser;
    } catch (err) {
      logger.log("error", `ErrorEnNegocioMensajes${err}`);
    }
  }
  async saveMsges(mensaje) {
    try {
      console.log(infoUser);
      const author1 = {
        idmail: infoUser.email,
        avatar: infoUser.avatar,
        nombre: infoUser.nombre,
        edad: infoUser.edad,
      };
      let text1 = mensaje.text;
      const saveMsgDtb = await DaoMensajes.guardarNuevoMensaje(author1, text1, timestamp);
      let act = await this.readMsgs();
      return act;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }

  normalizarMsges(msgRec) {
    try {
      const normalizarOk = normalize(msgRec, messageSchemaOk);
      // logger.log("info", `${JSON.stringify(normalizarOk, null, 4)}`);
      return normalizarOk;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}
module.exports = ContenedorMsjes;
