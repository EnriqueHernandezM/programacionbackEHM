const { connect, mongoose } = require("mongoose");
const Productos = require("../models/productos");
const Usuarios = require("../models/usuarios");
const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();
const enviarcorreo = require("../utils/nodemailer");

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
  }
}
module.exports = { ContenedorCarrito };
