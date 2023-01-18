const { connect, mongoose } = require("mongoose");
const Productos = require("./src/models/productos");
const { config } = require("dotenv");
config();
class Contenedor {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  memoryDirectory() {
    if (this.routPersistance == "productos") {
      return Productos;
    } else if (this.routPersistance == "carritos") {
      return Carritos;
    }
  }
  async connectMG() {
    try {
      await connect(process.env.DATABAS);
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
      return this.getAll();
    } catch (err) {
      console.log(err);
    }
  } /*  */
  async getById(number) {
    try {
      this.connectMG();
      const datas = await this.memoryDirectory().find({});
      return datas.find((el) => el._id == number);
    } catch (err) {
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
      await this.connectMG();
      Productos.deleteOne({ _id: aBorrar }).then(function () {
        console.log("Data deleted");
      });
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
    } catch (err) {
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
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = { Contenedor };

/* knex("cars")
  .insert({ name: "bmw", price: 2000 })
  .then(() => {
    console.log("logre meter ah la tabla");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  }); */

/* knex
  .from("cars")
  .select("*")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  }); */
//p borrar
/* knex
  .from("cars")
  .where("id", "=", 1)
  .then((res) => {
    console.log("borre bien");
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  }); */
//update
/* knex
  .from("cars")
  .where("id", "=", 1)
  .update({ price: 4500 })
  .then((res) => {
    console.log("actrualize bien");
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  });
  const { options } = require("./options/sqlite");
 */
/* knex
  .from("inventario")
  .select("*")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  });
 */
