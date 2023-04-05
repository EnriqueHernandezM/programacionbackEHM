const environmentVars = require("../utils/environmentVar");
const logger = require("../utils/loggers");
const twilio = require("twilio");
const accountSid = environmentVars.acountSid;
const authToken = environmentVars.authToken;
const { DaoCarrito, DaoProductos } = require("../persistencia/DAOs");
const client = twilio(accountSid, authToken);
const enviarcorreo = require("../utils/nodemailer");
class ContainerTrolley {
  constructor() {}
  async getAllToTrolley(idTrolley) {
    try {
      const allTrolley = await DaoCarrito.getAllTrolley(idTrolley);
      return allTrolley;
    } catch (err) {}
  }
  async addToCart(idUser, body) {
    try {
      const catchProduct = await this.getByIdProductos(body);
      if (!catchProduct || catchProduct.error) {
        return { msge: "no existe un producto con ese id" };
      }
      let catchCart = await ContainerTrolley.infoUser(idUser);
      //AEUI LLAMAREMOS AH LA FUNCION EN CASO DE QUE EL USUARIO AUN NO TEGA CARRTIO AL AGREGAR UN PRODUCTO LO CREARA AUTOMATICAMENTE
      let TrolleyUsed;
      if (catchCart.idTrolley === "f") {
        const createNtrolley = await DaoCarrito.createOneNewTrolley(catchCart._id);
        for (const data of createNtrolley) {
          TrolleyUsed = data.idUser;
        }
      }
      const idUserF = TrolleyUsed || catchCart.id;

      const agregarItem = await DaoCarrito.pushAunCarrito(idUserF, catchProduct, idUser);
      return agregarItem;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  async deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      let catchCart = await this.infoTrolley(idTrolley);
      const carritoI = catchCart.carrito;
      if (carritoI.length == 0) {
        return { msge: "tu carrito esta vacio" };
      }
      let catchCartIndex = carritoI.findIndex((el) => el._id == idItem);
      if (catchCartIndex < 0) {
        return { msge: "producto no existente en tu carrito" };
      }
      let x = carritoI.splice(catchCartIndex, 1);
      const deleteItem = await DaoCarrito.borrarUnItemCarrito(idTrolley, carritoI);
      logger.log("info", `${deleteItem}`);
      return deleteItem;
    } catch (err) {
      logger.log("error", `Error en deletElementTrolleyNegocio${err}`);
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
        to: environmentVars.correoServiceMe,
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
  }
  async getByIdProductos(number) {
    try {
      const data = await DaoProductos.getProductByIdDb(number);
      return data;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }
  static infoUser = async (idUsuario) => {
    try {
      const dataCarrito = await DaoCarrito.datosOneUser(idUsuario);
      for (const data of dataCarrito) {
        return data;
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  infoTrolley = async (idUsuario) => {
    try {
      if (idUsuario == "f") {
        return { carrito: [] };
      } else {
        const dataCarrito = await DaoCarrito.datosCarrito(idUsuario);
        for (const data of dataCarrito) {
          return data;
        }
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  }; ////////////////////////////////////////////////////AQUI hacemos el envio de mensaje de texto
  static enviarWats(usuarioQueCompro) {
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
  static enviarMsg = async (usuarioAenviar, pedido) => {
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
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}
module.exports = { ContainerTrolley };
