import faker from "faker";
faker.locale = "es";
const { commerce, finance, image, hacker, date } = faker;
import { writeFile } from "fs";

let str = "PRODUCTO;PRECIO;IMAGEN;DESCRIPTION;STOCKITEMS;DATA\n";

for (let i = 0; i < 10; i++) {
  str += commerce.product() + ";" + finance.amount() + ";" + image.cats() + ";" + hacker.phrase() + ";" + date.past() + ";" + date.past() + "\n";
}
console.log("rrrr);
writeFile("test.csv", str, (err) => {
  if (err) console.log(err);
  console.log("archivo guardado");
});
