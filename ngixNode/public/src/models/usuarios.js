const { Schema, model } = require("mongoose");

const UsuarrioSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const Usuarios = model("Usuarios", UsuarrioSchema);
module.exports = Usuarios;
