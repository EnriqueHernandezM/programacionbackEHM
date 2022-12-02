const { json } = require("express");
const { options } = require("./options/mysql");
const knex = require("knex")(options);

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
