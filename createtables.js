const { options } = require("./options/mysql");
const knex = require("knex")(options);

knex.schema
  .createTable("inventario", (table) => {
    table.increments("id"), table.string("products"), table.integer("precio"), table.string("imagen");
  })
  .then(() => {
    console.log("se creo con exito la tabla para productos");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });

/* const { options } = require("./options/sqlite");
const knex = require("knex")(options);

knex.schema
  .createTable("mensajes", (table) => {
    table.dateTime("fecha"), table.string("email"), table.string("mensaje");
  })
  .then(() => {
    console.log("se creo con exito la tabla para mensajes");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });
 */
