const mongoose = require("mongoose");
const logger = require("../utils/loggers");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABAS)
  .then(() => logger.log("info", "Connected to Mongo "))

  .catch((e) => {
    logger.log("error", e);
    throw "can not connect to the mongo!";
  });
