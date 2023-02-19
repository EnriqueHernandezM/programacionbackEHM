const { connect, mongoose } = require("mongoose");
const Productos = require("../models/productos");
const Usuarios = require("../models/usuarios");
const { config } = require("dotenv");
const logger = require("../utils/loggers");
config();
class ContenedorCarrito {
  constructor() {}
  /*  memoryDirectory() {
    try {
      if (this.routPersistance == "productos") {
        return Productos;
      } else if (this.routPersistance == "carritos") {
        return Carritos;
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  } */
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
}
module.exports = { ContenedorCarrito };
