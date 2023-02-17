const { Schema, model } = require("mongoose");

const UsuarrioSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true, max: 100 },
  telefono: { type: Number, required: true },
  avatar: { type: String, required: true },
});

const Usuarios = model("Usuarios", UsuarrioSchema);
module.exports = Usuarios;
