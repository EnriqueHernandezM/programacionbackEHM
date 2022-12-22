const { parse } = require("dotenv");
const { json } = require("express");
const { connect, mongoose } = require("mongoose");
const Productos = require("../models/mongo/productos");
const Carritos = require("../models/mongo/carritos");
mongoose.set("strictQuery", true);

//CONTENEDOR PARA GUARDAN EN mONGOAtlas
class ContenedorMongo {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  memoryDirectory() {
    if (this.routPersistance == "Productos") {
      return Productos;
    } else if (this.routPersistance == "carritos") {
      return Carritos;
    }
  }
  async connectMG() {
    try {
      await connect("mongodb+srv://enriquehm:0h47RMcEkqCLHjTP@cluster0.ckqspop.mongodb.net/ecommerce?retryWrites=true&w=majority");
      console.log("conecte");
    } catch (e) {
      console.log(e);
      throw "can not connect to the db";
    }
  }
  async save(producto) {
    try {
      await this.connectMG();
      console.log(producto);
      const newProduct = new Productos(producto);
      await newProduct.save().then((data) => console.log(data));
    } catch {
      console.log(err);
    }
  } /*  */
  async getById(number) {
    try {
      this.connectMG();
      const datas = await this.memoryDirectory().find({});
      return datas.find((el) => el._id == number);
    } catch {
      console.log(err);
    }
  }
  async getAll() {
    try {
      await this.connectMG();
      const data = await this.memoryDirectory().find({});
      return data;
    } catch (err) {
      return { error: err };
    }
  }

  async deleteById(aBorrar) {
    try {
      const buscar = await this.getById(aBorrar);
      const usuarioBorrar = await this.memoryDirectory().deleteOne({ codeItem: buscar.codeItem });
      console.log(usuarioBorrar);
    } catch {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
    } catch {
      console.log(err);
    }
  }
  async modifyElement(id, body) {
    try {
      const buscar = await this.getById(id);
      const usuarioModificado = await this.memoryDirectory().updateOne(
        { codeItem: buscar.codeItem },
        {
          $set: {
            producto: body.producto,
            precio: body.precio,
            imagen: body.imagen,
            description: body.description,
            stockItems: body.stockItems,
            codeItem: body.stockItems,
          },
        }
      );
      console.log(usuarioModificado);
    } catch {
      console.log(err);
    }
  }
  //probada/////////////////////////////////////////////
  async getAllForItemsTrolley(idC) {
    try {
      await this.connectMG();
      const data = await this.memoryDirectory().find({});
      const catchTrolley = data.find((el) => el._id == idC);
      return catchTrolley;
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  // UNICA QUE SOLICITA CON RUTA FIJA BUSCAR SOLUCION
  async getByIdProductos(number) {
    try {
      const data = await Productos.find({});
      return data.find((el) => el._id == number);
    } catch {
      console.log(err);
    }
  }
  //Solo retorna Id por Terminal
  async creatteCart(newCart) {
    try {
      await this.connectMG();
      const newCartCreate = new Carritos({
        trolley: [newCart],
      });
      await newCartCreate.save().then((data) => console.log(data + "nuevo carrito vacio creado"));
    } catch {
      console.log(err);
    }
  }
  //AGREGAR PRODUCTOS AL CARRITO
  async addToCart(artId, body) {
    try {
      await this.connectMG();
      //trae el producto por id
      const catchProduct = await this.getByIdProductos(body);
      console.log(catchProduct);
      const agregarItem = await Carritos.updateOne(
        { _id: artId },
        {
          $push: {
            trolley: catchProduct,
          },
        }
      );
      console.log(agregarItem);
      return { res: "producto agregado en carrito con id ", articleAddInTrolleyID: artId };
    } catch {
      console.log(err);
    }
  }

  async deleteByIdAllTrolley(aBorrar) {
    try {
    } catch {
      console.log(err);
    }
  }
  async deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      const usuarioBorrar = await Carritos.deleteOne({});
      console.log(usuarioBorrar);
    } catch {
      console.log(err);
    }
  }
}

module.exports = ContenedorMongo;
