const { ContenedorMsjes } = require("../negocio/mensajes");
const containerMsjes = new ContenedorMsjes("mensajes");
const { Contenedor } = require("../negocio/productos");
const containerProducts = new Contenedor("productos");
const logger = require("../utils/loggers");

function socketModule(io) {
  io.on("connection", async (socket) => {
    logger.log("info", "con3ct Socket");
    //sOCKETS PRODUCTOS
    socket.on("on", async () => {
      io.sockets.emit("feedAct", await containerProducts.getAll());
    });
    socket.on("actualizame", async (data) => {
      let act = await containerProducts.save(data);
      io.sockets.emit("feedAct", act);
    });
    socket.on("deleteElement", async (idAb) => {
      await containerProducts.deleteById(idAb);
      const actual = await containerProducts.getAll();
      io.sockets.emit("feedAct", actual);
    });
    //
    //SOCKETS MENSAJES
    socket.on("msg", async (data) => {
      let guardar = await containerMsjes.saveMsges(data);
      let probandoNormalizr = containerMsjes.normalizarMsges(guardar);
      io.sockets.emit("listaMsgs", probandoNormalizr);
    });
  });
}
module.exports = socketModule;
