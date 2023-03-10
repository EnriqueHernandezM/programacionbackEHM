const { config } = require("dotenv");
config();

let environmentVars = {
  mongoDb: process.env.DATABAS,
  sessionSecret: process.env.SESSIONSECRET,
  correoServiceMe: process.eventNames.CORREOSERVICEME,
  correoServiceMePass: process.env.CORREOSERVICEMEPASS,
  acountSid: process.env.ACOUNTSID,
  authToken: process.env.AUTHTOKEN,
  cluster: process.env.CLUSTER,
  dbInUse: process.env.DBINUSE,
};

module.exports = environmentVars;
