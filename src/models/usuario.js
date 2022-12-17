const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  usuario: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: Number, required: true },
});
const Usuarios = model("usuarios", UsuarioSchema);
module.exports = Usuarios;
