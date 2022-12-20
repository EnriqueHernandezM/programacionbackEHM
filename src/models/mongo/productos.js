const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  producto: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  stockItems: { type: Number, required: true },
  codeItem: { type: Number, required: true },
  data: Date,
});
const Productos = model("Productos", ProductoSchema);
module.exports = Productos;
