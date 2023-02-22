const { connect, mongoose } = require("mongoose");
const Productos = require("../models/productos");
const Usuarios = require("../models/usuarios");
const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();

const twilio = require("twilio");
const accountSid = process.env.ACOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);

class ContenedorCarrito {
  constructor() {}

  async connectMG() {
    try {
      await connect(process.env.DATABAS);
      logger.log("info", "conecte bse de datos Productos proosss");
    } catch (err) {
      logger.log("error", `${err}`);
      throw "can not connect to the db";
    }
  }
  async getByIdProductos(number) {
    try {
      const data = await Productos.find({});
      let res = data.find((el) => el._id == number);
      return res;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async addToCart(idUser, body) {
    try {
      await this.connectMG();
      const catchProduct = await this.getByIdProductos(body);
      const agregarItem = await Usuarios.updateOne(
        { _id: idUser },
        {
          $push: {
            carrito: catchProduct,
          },
        }
      );
      logger.log("info", `${agregarItem}`);
      return {};
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async comprarCarrito(idUsuario) {
    try {
      const dataCarrito = await Usuarios.find({ _id: idUsuario });
      for (const data of dataCarrito) {
        return data;
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  } /////////////////////////////////////////////////////AQUI hacemos el envio de mensaje de texto
  async enviarMsg(usuarioAenviar, pedido) {
    try {
      let pedidoString = pedido.toString();
      if (usuarioAenviar.telefono == "5613507622" || usuarioAenviar.telefono == "5548375096") {
        const message = await client.messages.create({
          body: `Hola tu pedido a sido recibido. Tus produtos son: ${pedidoString}`,
          from: "+13464838665",
          to: "+52" + usuarioAenviar.telefono,
        });
        logger.log("info", `${message}`);
      } else {
        logger.log("warn", "En el modo pruba de twilio solo se pueden usarn numeros registrados");
      }
    } catch (error) {
      logger.log("error", `${err}`);
    }
  }
  enviarWats(usuarioQueCompro) {
    try {
      client.messages
        .create({
          body: `has recibido un nuevo pedido de ${usuarioQueCompro}`,
          from: "whatsapp:+14155238886",
          to: "whatsapp:+5215613507622",
        })
        .then((message) => logger.log("info", `${message.sid}`));
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      await this.connectMG();
      let catchCart = await this.comprarCarrito(idTrolley);
      let carrito = catchCart.carrito;
      catchCart = carrito.findIndex((el) => el._id == idItem);
      let x = carrito.splice(catchCart, 1);
      const agregarItem = await Usuarios.updateOne(
        { _id: idTrolley },
        {
          $set: {
            carrito: carrito,
          },
        }
      );
      logger.log("info", `${agregarItem}`);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}
module.exports = { ContenedorCarrito };
