const faker = require("faker");
faker.locale = "es";
const { commerce, finance, image, hacker, date } = faker;
const { writeFile } = require("fs");

let str = "PRODUCTO;PRECIO;IMAGEN;DESCRIPTION;STOCKITEMS;DATA\n";

for (let i = 0; i < 5; i++) {
  str += commerce.product() + ";" + finance.amount() + ";" + image.cats() + ";" + hacker.phrase() + ";" + date.past() + ";" + date.past() + "\n";
}

module.exports = str;
