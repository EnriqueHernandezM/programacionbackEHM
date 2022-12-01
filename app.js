const { json } = require("express");
const { DateTime } = require("luxon");

const { options } = require("./options/mysql");
const knex = require("knex")(options);

let fs = require("fs");
class Contenedor {
  constructor(nameTable) {
    this.nameTable = nameTable;
  }
  async getAll() {
    try {
      const inventary = await knex(this.nameTable).select("*");
      return JSON.parse(JSON.stringify(inventary));
    } catch (err) {
      console.log(err);
    }
  }
  async save(producto) {
    try {
      await knex(this.nameTable).insert(producto);
      console.log("producto Guardado correctamente");
      return this.getAll();
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(aBorrar) {
    try {
      await knex(this.nameTable).where("id", aBorrar).del();
      console.log("producto Borrado correctamente");
      return this.getAll();
    } catch {
      console.log(err);
    }
  }
  getById(number) {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > 0 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  deleteAll() {
    try {
      fs.writeFileSync("./productos.txt", JSON.stringify([]), console.log("Archivo vaciado correctamente"));
    } catch {
      console.log(err);
    }
  }

  modifyElement(id, body) {
    try {
      let all = this.getAll();
      let product = all.findIndex((el) => el.id == id);
      if (product >= 0) {
        all[product] = body;
        let products = JSON.stringify(all);
        fs.writeFileSync("./productos.txt", products);
        return { res: true, msg: "producto correctamente modificado", producto: body };
      }
      if (product == -1) {
        console.log("err");
        return { err: true, msg: "producto a modificar no existe" };
      }
    } catch {
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
