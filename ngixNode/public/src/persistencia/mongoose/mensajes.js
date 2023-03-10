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

class ContainerMessagesMongo {
  constructor(collection) {
    this.collection = collection;
  }
  traerMensajesOredenadoPorFecha = async () => {
    const mensajesPorFecha = await Mensajes.find({});

    return mensajesPorFecha;
  };
  guardarNuevoMensaje = async (author1, text1, timestamp) => {
    try {
      const res = { author: author1, text: text1, time: timestamp };
      const newMessage = new Mensajes(res);
      await newMessage.save().then((data) => console.log(data));
    } catch (err) {
      logger.log("error", `${err}`);
      return { error: err };
    }
  };
}

module.exports = ContainerMessagesMongo;
/* container firebas and mongo its ready , memory the constructor recived collection mensajes*/
//dejemos mensajes al ultimo vale y sigamos con volver toda la persistencia contenedores
/* function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      } */
