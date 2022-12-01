const optionsLite = {
  client: "sqlite3",
  connection: {
    filename: "./DB/mydb.sqlite",
  },
  useNullAsDefault: true,
};
module.exports = {
  optionsLite,
};
