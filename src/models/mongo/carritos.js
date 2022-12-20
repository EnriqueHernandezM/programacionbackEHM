const { Schema, model } = require("mongoose");

const CarritosSchema = new Schema({
  trolley: { type: Object },
  data: Date,
});
const Carritos = model("carritos", CarritosSchema);
module.exports = Carritos;
