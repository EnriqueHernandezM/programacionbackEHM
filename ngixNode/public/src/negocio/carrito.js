const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();
const twilio = require("twilio");
const accountSid = process.env.ACOUNTSID;
const authToken = process.env.AUTHTOKEN;
const { traerProductoParaCarrito, pushAunCarrito, borrarUnItemCarrito, datosCarrito } = require("../persistencia/carrito");
const client = twilio(accountSid, authToken);
const enviarcorreo = require("../utils/nodemailer");
class ContenedorCarrito {
  constructor() {}

  async getByIdProductos(number) {
    try {
      const data = await traerProductoParaCarrito();
      let res = data.find((el) => el._id == number);
      return res;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async addToCart(idUser, body) {
    try {
      const catchProduct = await this.getByIdProductos(body);
      const agregarItem = await pushAunCarrito(idUser, catchProduct);
      logger.log("info", `${agregarItem}`);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async infoCarrito(idUsuario) {
    try {
      const dataCarrito = await datosCarrito(idUsuario);
      for (const data of dataCarrito) {
        return data;
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async comprarCarrito(dataCarrito) {
    try {
      let pedido = [];
      dataCarrito.carrito.forEach((el) => {
        pedido.push(el.producto);
      });
      await this.enviarMsg(dataCarrito, pedido);
      this.enviarWats(dataCarrito.nombre);
      const mailOptionsConfirm = {
        from: `Servidor Node. JackVinaterias`,
        to: process.env.CORREOSERVICEME,
        subject: `Nuevo Pedido de ${dataCarrito.nombre}`,
        html: `<div>
         <h1 style="color: black;">Hola has recibido un nuevo pedido</h1>
          <h1 style="color: blue;">Email Usuario <span style="color: green;">${dataCarrito.email}</span></h1>
            <h1 style="color: blue;"> telefono Contacto<span style="color: green;">${dataCarrito.telefono}</span></h1>
            <h1 style="color: blue;">Direccion <span style="color: green;">${dataCarrito.direccion}</span></h1>
            <h1 style="color: blue;">productos:<span style="color: green;">${pedido}</span></h1>
        </div>
        `,
      };
      enviarcorreo(mailOptionsConfirm);
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
      const deleteItem = await borrarUnItemCarrito(idTrolley, carrito);
      logger.log("info", `${deleteItem}`);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
}
module.exports = { ContenedorCarrito };
