const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => logger.log("info", "Connected to Mongo para registrar Usuarios"))

  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  });
