const logger = require("../../utils/loggers");
const moment = require("moment");
const timestamp = moment().format("lll");
let inventarios = [
  {
    id: 1,
    product: "Don Pedro",
    typeOfLiquor: "Brandy",
    price: 350,
    image: "https://cdn.shopify.com/s/files/1/0402/2475/1766/products/BRANDYDONPEDRO1000MLSHOPIFY_700x.jpg?v=1637864473",
    description: "Brandy Don Pedro Reserva Especial 750 ml a un súper precio",
    stockItems: 9,
    codeItem: 111,
    data: "2023-03-03T09:35:13.475Z",
  },
  {
    id: 2,
    product: "Moet Chandom",
    typeOfLiquor: "Champagne",
    price: 980,
    image: "https://www.sampieri.com.mx/wp-content/uploads/2018/07/CHAMPAGNE-MOET-CHANDON-BRUT-EST-MADERA.jpg",
    description: "Fundada en 1743, Moët & Chandon celebra los momentos memorables de la vida con una gama de champagnes únicos para cada ocasión.",
    stockItems: 4,
    codeItem: 122,
    data: "2023-03-03T09:36:30.012Z",
  },
  {
    id: 3,
    product: "Nuvo",
    typeOfLiquor: "Vodka",
    price: 820,
    image: "https://ss388.liverpool.com.mx/xl/1064210455.jpg",
    description: "Nuvo es una bebida innovadora que mezcla vodka premium con vinos franceses",
    stockItems: 5,
    codeItem: 144,
    data: "2023-03-03T09:40:16.268Z",
  },
];

class ContainerProductMem {
  constructor() {}
  guardarNuevoProducto = (product) => {
    try {
      let all = this.traerTodosLosItems();
      let id = 1;
      let data = timestamp;
      all.length > 0 &&
        all.forEach((el) => {
          id = el.id + 1;
        });
      product.data = data;
      product.id = id;
      all.push(product);
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  traerProductoProId = (number) => {
    try {
      let buscaPmostrar = inventarios.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? inventarios.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch (error) {
      logger.log("error", `${err}`);
    }
  };
  traerTodosLosItems = () => {
    try {
      return inventarios;
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
  borrarItemInventario = (aBorrar) => {
    try {
      const datas = this.traerTodosLosItems();
      let buscaPborrar = datas.findIndex((el) => el.id == aBorrar);
      if (buscaPborrar >= 0) {
        datas.splice(buscaPborrar, 1);
        return { err: false, msg: "producto eliminado Correctamente" };
      }
      if (buscaPborrar == -1) {
        return { err: true, msg: "producto a eliminar no existe" };
      }
    } catch (err) {
      console.log(err);
    }
  };
  modificarUnElemento = (id, body) => {
    try {
      let all = this.getAll();
      let product = all.findIndex((el) => el.id == id);
      if (product <= -1) {
        return { error: "true", mesage: "producto a modificar no existe no existe" };
      }
      let data = all[product].data;
      let codeItem = all[product].codeItem;
      if (product >= 0) {
        id = parseInt(id);
        let newProduct = { ...body, data, codeItem, id };
        all[product] = newProduct;
        return all;
      }
    } catch (err) {
      logger.log("error", `${err}`);
    }
  };
}

module.exports = { ContainerProductMem, inventarios };
