const environmentVars = require("../../utils/environmentVar");
const logger = require("../../utils/loggers");
const mongoose = require("mongoose");
const Usuarios = require("../../models/usuarios");

mongoose.set("strictQuery", false);
mongoose
  .connect(environmentVars.mongoDb)
  .then(() => logger.log("info", "Connected to Mongo para registrar Usuarios"))

  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  });

class ContainerUsuariosMongo {
  constructor(collection) {
    this.collection = collection;
  }
  /////////////////////////////////////////////////Funcion Para Dezerializer
  getOneUserForId = (id, done) => {
    return Usuarios.findById(id, done);
  };

  getOneUserForEmail = (emailD) => {
    return Usuarios.findOne(emailD);
  };
}

module.exports = { ContainerUsuariosMongo, Usuarios };
/*  case "firebas":
            db.collection("usuarios")
              .doc()
              .set(newUser, (err, userWithId) => {
                if (err) {
                  logger.log("info", `Error in Saving user:${err}`);
                  return done(err);
                }
                console.log(user);
                logger.log("info", "User Registration succesful");
                enviarcorreo(mailOptions);
                ///////////////////////////////////////////////////////////////////////
                return done(null, userWithId);
              });
            break; */
