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
