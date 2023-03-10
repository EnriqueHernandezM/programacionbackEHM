const { usuarios } = require("../../utils/createUserParallel");
const logger = require("../../utils/loggers");

class ContainerCarritoMem {
  constructor() {}
  getAllTrolley = () => {
    try {
      const datas = usuarios;
      return datas[0].carrito;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  pushAunCarrito = (id, catchProduct) => {
    try {
      let carr = this.getAllTrolley();
      carr.push(catchProduct);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  borrarUnItemCarrito = async (idTrolley, carrito) => {
    try {
      let datasAct = this.getAllTrolley();
      datasAct = carrito;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  datosCarrito = (idUsuario) => {
    try {
      return usuarios;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}

module.exports = ContainerCarritoMem;
