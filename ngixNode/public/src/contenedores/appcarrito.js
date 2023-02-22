const { connect, mongoose } = require("mongoose");
const Productos = require("../models/productos");
const Usuarios = require("../models/usuarios");
const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();

const twilio = require("twilio");
const accountSid = "AC652919f586b5100174f59443e147d24f";
const authToken = "8fe125f82e2b42bf0cb3d1194211e231";

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
      console.log(err);
    }
  }
  async addToCart(idUser, body) {
    try {
      await this.connectMG();
      //trae el producto por id
      const catchProduct = await this.getByIdProductos(body);
      const agregarItem = await Usuarios.updateOne(
        { _id: idUser },
        {
          $push: {
            carrito: catchProduct,
          },
        }
      );
      console.log(agregarItem);
      return {};
    } catch (err) {
      console.log(err);
    }
  }
  async comprarCarrito(idUsuario) {
    try {
      const dataCarrito = await Usuarios.find({ _id: idUsuario });
      for (const data of dataCarrito) {
        return data;
      }
    } catch (err) {}
  } /////////////////////////////////////////////////////AQUI hacemos el envio de mensaje de texto
  async enviarMsg(usuarioAenviar, pedido) {
    try {
      let pedidoString = pedido.toString();
      if (usuarioAenviar.telefono != "5613507622" || usuarioAenviar.telefono != "5548375096") {
        logger.log("warn", "En el modo pruba de twilio solo se pueden usarn numeros registrados");
      }
      const message = await client.messages.create({
        body: `Hola tu pedido a sido recibido. Tus produtos son: ${pedidoString}`,
        from: "+13464838665",
        to: "+52" + usuarioAenviar.telefono,
      });
      logger.log("info", `${message}`);
    } catch (error) {
      console.log(error);
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
        .then((message) => console.log(message.sid));
    } catch (err) {}
  }
}
module.exports = { ContenedorCarrito };
