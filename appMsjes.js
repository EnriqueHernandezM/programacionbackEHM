const { optionsLite } = require("./options/sqlite");
const knex = require("knex")(optionsLite);
const moment = require("moment");
const timestamp = moment().format("lll");

class ContenedorMsjes {
  constructor(table) {
    this.table = table;
  }
  async readMsgs() {
    const everybodyMsges = await knex(this.table).select("*");
    if (everybodyMsges) {
      return JSON.parse(JSON.stringify(everybodyMsges));
    } else {
      return [];
    }
  }
  async saveMsges(obj) {
    try {
      await knex(this.table).insert({ time: timestamp, ...obj });
      console.log("mensaje nuevo guardado");
      return this.readMsgs();
    } catch {
      console.log(err);
    }
  }
}

module.exports = { ContenedorMsjes };
