const { config } = require("dotenv");
//IMPORT CLASES File SISTEM
const ProductosDaoFs = require("./productos/productosDaoFs");
const CarritoDeCompras = require("./carritos/carritosDaoFs");
//IMPORT CLASES MEMORIA
const ProductosMemory = require("./productos/productosDaoMem");
const CarritoMemory = require("./carritos/carritosDaoMemoria");
//imports clases mongo
const ProductosMongo = require("./productos/productosDaoMongo");
const CarritoMongo = require("./carritos/carritosDaoMongo");

config();
const instancias = [
  {
    nombre: ProductosDaoFs,
    id: "fs",
    descripcion: "productos",
  },
  {
    nombre: CarritoDeCompras,
    id: "fs",
    descripcion: "trolleys",
  },
  {
    nombre: ProductosMemory,
    id: "memory",
    descripcion: "productos",
  },
  {
    nombre: CarritoMemory,
    id: "memory",
    descripcion: "trolleys",
  },
  {
    nombre: ProductosMongo,
    id: "mongo",
    descripcion: "productos",
  },
  {
    nombre: CarritoMongo,
    id: "mongo",
    descripcion: "trolleys",
  },
];
const instancia = instancias.filter((el) => el.id == process.env.INSTANCIA);

const rutaResult = {
  [instancia[0].descripcion]: instancia[0].nombre,
  [instancia[1].descripcion]: instancia[1].nombre,
};

module.exports = rutaResult;
