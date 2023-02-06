const winston = require("winston");
const { combine, colorize, timestamp, json, prettyPrint } = winston.format;
const warnFilter = winston.format((info, opts) => {
  return info.level === "warn" ? info : false;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),

  transports: [
    new winston.transports.Console({ level: "info", format: combine(json(), colorize({ all: true })) }),

    new winston.transports.File({ filename: "warn.log", level: "warn", format: combine(warnFilter(), timestamp(), json()) }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

/*logger2.log("debug", "127.0.0.1 - log debug");
logger2.log("verbose", "127.0.0.1 - log silly");
logger2.log("verbose", "127.0.0.1 - log verbose");

logger2.log("info", "127.0.0.1 - log info");
logger2.log("warn", "127.0.0.1 - log warn");
logger2.log("error", "127.0.0.1 - log error");*/

module.exports = logger;
