const { Schema, model } = require("mongoose");

const MensajesSchema = new Schema({
  author: {
    type: Map,
    of: String,
    required: true,
  },
  text: { type: String, required: true, max: 100 },
  time: Date,
});
const Mensajes = model("mensajes", MensajesSchema);

const logger = require("../../utils/loggers");
///

class ContainerMessagesFirebas {
  constructor(collection) {
    this.collection = collection;
  }
  traerMensajesOredenadoPorFecha = async () => {
    const mensajesPorFecha = await db.collection(this.collection).orderBy("time", "asc").get();
    return mensajesPorFecha;
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    try {
      const newMessage = new Mensajes();
      await newMessage.save().then((data) => console.log(data));
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
    let res;
    res = await db.collection(this.collection).doc().set({
      author: author1,
      text: text1,
      time: timestamp,
    });
    return res;
  };
}

module.exports = ContainerMessagesMongo;
/* container firebas and mongo its ready , memory the constructor recived collection mensajes*/
//dejemos mensajes al ultimo vale y sigamos con volver toda la persistencia contenedores
