const logger = require("../utils/loggers");
const bcrypt = require("bcrypt");
//const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
//const serviceAccount = require("../../../../privi.json");
/* admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}); 
logger.log("info", "conecte base firebass");*/
const db = getFirestore();
const usuarios = [];

const createUserParallel = async (objectUser) => {
  try {
    usuarios.push(objectUser);
    const newUser = await db
      .collection("usuarios")
      .doc()
      .set({
        email: objectUser.email,
        password: createHash(objectUser.password),
        nombre: objectUser.nombre,
        edad: objectUser.edad,
        direccion: objectUser.direccion,
        telefono: objectUser.telefono,
        avatar: objectUser.avatar,
        carrito: [
          {
            id: 1,
            product: "Don Pedro",
            typeOfLiquor: "Brandy",
            price: 350,
            image: "https://cdn.shopify.com/s/files/1/0402/2475/1766/products/BRANDYDONPEDRO1000MLSHOPIFY_700x.jpg?v=1637864473",
            description: "Brandy Don Pedro Reserva Especial 750 ml a un súper precio",
            stockItems: 9,
            codeItem: 111,
            data: "2023-03-03T09:35:13.475Z",
          },
        ],
      });
    logger.log("info", `${newUser}`);
    return newUser;
  } catch (err) {
    logger.log("error", `${err}`);
    return { error: err };
  }
};

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = { createUserParallel, usuarios };
