const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  producto: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true, max: 100 },
});
const Productos = model("ProductosSocket", ProductoSchema);
module.exports = Productos;
