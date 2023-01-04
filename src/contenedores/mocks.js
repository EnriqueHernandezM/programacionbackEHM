const faker = require("faker");
faker.locale = "es";
const { commerce, finance, image, hacker, date } = faker;

const str = () => {
  let arrPrototype = [];
  for (let i = 0; i < 10; i++) {
    let producto = commerce.product();
    let precio = finance.amount();
    let imagen = image.business();
    let description = hacker.phrase();
    let data = date.past();
    arrPrototype.push({ producto: producto, precio: precio, imagen: imagen, description: description, data: data });
  }
  return arrPrototype;
};

module.exports = str;
