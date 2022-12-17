const { DateTime } = require("luxon");
//arrays para memoriua
const arrayDeProductos = [
  {
    producto: "Moet Chandom",
    precio: "753",
    imagen: "https://www.sampieri.com.mx/wp-content/uploads/2018/07/CHAMPAGNE-MOET-CHANDON-BRUT-EST-MADERA.jpg",
    description: "Fundada en 1743, Moët & Chandon celebra los momentos memorables de la vida con una gama de champagnes únicos para cada ocasión.",
    stockItems: "9",
    codeItem: 5003494,
    data: "2022-11-24T20:23:44.417-06:00",
    id: 2,
  },
];
const arrayDeCarritos = [
  {
    data: "2022-11-24T20:21:39.636-06:00",
    id: 5,
    trolley: [
      {
        producto: "Moet Chandom",
        precio: "750",
        imagen: "https://www.sampieri.com.mx/wp-content/uploads/2018/07/CHAMPAGNE-MOET-CHANDON-BRUT-EST-MADERA.jpg",
        description: "Fundada en 1743, Moët & Chandon celebra los momentos memorables de la vida con una gama de champagnes únicos para cada ocasión.",
        stockItems: "4",
        data: "2022-11-24T20:23:44.417-06:00",
        codeItem: 5003494,
        id: 2,
      },
    ],
  },
];
//CONTENEDOR PARA GUARDAN EN FILESYSTEM
class ContenedorMemory {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  memoryDirectory() {
    if (this.routPersistance == "arrayDeProductos") {
      return arrayDeProductos;
    } else if (this.routPersistance == "arrayDeCarritos") {
      return arrayDeCarritos;
    }
  }
  save(producto) {
    try {
      let all = this.getAll();
      let id = 1;
      let data = DateTime.local();
      let codeItem = this.random(1000000, 10000000);
      all.length > 0 &&
        all.forEach((el) => {
          id = el.id + 1;
        });
      producto.data = data;
      producto.codeItem = codeItem;
      producto.id = id;
      all.push(producto);
      return all;
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datasq = this.memoryDirectory();
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  getAll() {
    try {
      const datas = this.memoryDirectory();
      if (datas) {
        return datas;
      } else {
        return [];
      }
    } catch (err) {
      return { error: err };
    }
  }
  deleteById(aBorrar) {
    try {
      const datas = this.getAll();
      let buscaPborrar = datas.findIndex((el) => el.id == aBorrar);
      if (buscaPborrar >= 0) {
        datas.splice(buscaPborrar, 1);
        return { err: false, msg: "producto eliminado Correctamente" };
      }
      if (buscaPborrar == -1) {
        console.log("err");
        return { err: true, msg: "producto a eliminar no existe" };
      }
    } catch {
      console.log(err);
    }
  }
  deleteAll() {
    try {
      const all = this.getAll();
      all.push([]);
      console.log("Archivo vaciado correctamente");
    } catch {
      console.log(err);
    }
  }
  modifyElement(id, body) {
    try {
      let all = this.getAll();
      let product = all.findIndex((el) => el.id == id);
      let data = all[product].data;
      let codeItem = all[product].codeItem;
      if (product >= 0) {
        id = parseInt(id);
        let newProduct = { ...body, data, codeItem, id };
        all[product] = newProduct;
        return all;
      }
      if (product == -1) {
        console.log("err");
      }
    } catch {
      console.log(err);
    }
  }
  getAllForItemsTrolley(idC) {
    try {
      const aggregates = this.memoryDirectory();
      if (aggregates) {
        const catchTrolley = aggregates.find((el) => el.id == idC);
        return catchTrolley.trolley;
      } else {
        return { notProducts: "el Carritoa vacio" };
      }
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  // UNICA QUE SOLICITA CON RUTA FIJA BUSCAR SOLUCION
  getByIdProductos(number) {
    try {
      const datas = arrayDeProductos;
      let buscaPmostrar = datas.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datas.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  creatteCart(newCart) {
    console.log(newCart);
    try {
      let all = this.getAll();
      let id = 1;
      let data = DateTime.local();
      const trolley = [];
      all.length > 0 &&
        all.forEach((el) => {
          id = el.id + 1;
        });
      newCart.data = data;
      newCart.id = id;
      newCart.trolley = trolley;
      all.push(newCart);
      return { idAsignado: id, create: "nuevo carrito vacio creado" };
    } catch {
      console.log(err);
    }
  }
  addToCart(artId, body) {
    try {
      const trolleyDisp = this.getAll();
      //trae el carro por id
      const catchTrolley = this.getById(artId);
      //trae el producto por id
      const catchProduct = this.getByIdProductos(body);
      //traigo el indice del CarritoCompras
      const catchIn = trolleyDisp.findIndex((el) => el.id == artId);
      //a el carrittp del carrito le pusheo el preoductro
      catchTrolley.trolley.push(catchProduct);
      let newProduct = catchTrolley;
      trolleyDisp[catchIn] = newProduct;
      return { res: "producto agregado en carrito con id ", articleAddInTrolleyID: artId };
    } catch {
      console.log(err);
    }
  }
  deleteByIdAllTrolley(aBorrar) {
    try {
      let datasq1 = this.getAll();
      let buscaPborrar = datasq1.findIndex((el) => el.id == aBorrar);
      if (buscaPborrar >= 0) {
        datasq1.splice(buscaPborrar, 1);
        return { res: true, msg: "carrito correctamente eliminado" };
      }
      if (buscaPborrar == -1) {
        console.log("err");
        return { err: true, msg: "Carrito a eliminar no existe" };
      }
    } catch {
      console.log(err);
    }
  }
  deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      const trolleyDisp = this.getAll();
      const catchInC = trolleyDisp.findIndex((el) => el.id == idTrolley);
      let catchTrolleyW = this.getById(idTrolley);
      let buscaPborrar = catchTrolleyW.trolley.findIndex((el) => el.id == idItem);
      if (buscaPborrar >= 0) {
        catchTrolleyW.trolley.splice(buscaPborrar, 1);
        const deleteProduct = catchTrolleyW;
        trolleyDisp[catchInC] = deleteProduct;
        return { res: true, msg: "producto correctamente eliminado" };
      }
      if (buscaPborrar == -1) {
        console.log("err");
        return { err: true, msg: "producto a eliminar no existe" };
      }
    } catch {
      console.log(err);
    }
  }
}
module.exports = ContenedorMemory;
