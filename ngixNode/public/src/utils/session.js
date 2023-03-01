const session = require("express-session");
const MongoStore = require("connect-mongo");
module.exports = session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABAS,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000, //sesion durara 10 minutos
  },
});
