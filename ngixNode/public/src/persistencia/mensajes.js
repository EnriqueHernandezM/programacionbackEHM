const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../privi.json");
const logger = require("../utils/loggers");
///
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
logger.log("info", "conecte base firebass");
const db = getFirestore();

const traerMensajesOredenadoPorFecha = async () => {
  const mensajesPorFecha = await db.collection("mensajes").orderBy("time", "asc").get();
  return mensajesPorFecha;
};
const guardarNuevoMensaje = async (author1, text1, timestamp) => {
  let res;
  res = await db.collection("mensajes").doc().set({
    author: author1,
    text: text1,
    time: timestamp,
  });
  return res;
};
module.exports = { traerMensajesOredenadoPorFecha, guardarNuevoMensaje };
