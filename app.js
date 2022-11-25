const { json } = require("express");
const { DateTime } = require("luxon");

let fs = require("fs");
class Contenedor {
  constructor() {}
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
      let products = JSON.stringify(all);
      fs.writeFileSync("./productos.json", products);
      return all;
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datas = fs.readFileSync("./productos.json", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > 0 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  getAll() {
    try {
      const datas = fs.readFileSync("./productos.json", "utf-8");
      if (datas) {
        return JSON.parse(datas);
      } else {
        return [];
      }
    } catch (err) {
      return { error: err };
    }
  }
  deleteById(aBorrar) {
    try {
      const datas = fs.readFileSync("./productos.json", "utf-8");
      let datasq1 = JSON.parse(datas);
      let buscaPborrar = datasq1.findIndex((el) => el.id == aBorrar);
      if (buscaPborrar >= 0) {
        datasq1.splice(buscaPborrar, 1);
        let documentAc = JSON.stringify(datasq1);
        fs.writeFileSync("./productos.json", documentAc);
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
      fs.writeFileSync("./productos.json", JSON.stringify([]), console.log("Archivo vaciado correctamente"));
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
        let products = JSON.stringify(all);
        fs.writeFileSync("./productos.json", products);
        return all;
      }
      if (product == -1) {
        console.log("err");
      }
    } catch {
      console.log(err);
    }
  }
}
//classes para carrito  podriamos mejopr juntarlo
class CarritoCompras {
  constructor() {}
  getAllTrolley() {
    try {
      const aggregates = fs.readFileSync("./itemstrolley.json", "utf-8");
      if (aggregates) {
        return JSON.parse(aggregates);
      } else {
        return { notProducts: "el Carritoa vacio" };
      }
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  getAllForItemsTrolley(idC) {
    try {
      const aggregates = fs.readFileSync("./itemstrolley.json", "utf-8");
      if (aggregates) {
        const trolleyDisp = JSON.parse(aggregates);
        const catchTrolley = trolleyDisp.find((el) => el.id == idC);
        return catchTrolley.trolley;
      } else {
        return { notProducts: "el Carritoa vacio" };
      }
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  getByIdCart(number) {
    try {
      const datas = fs.readFileSync("./itemsTrolley.json", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  getByIdProductos(number) {
    try {
      const datas = fs.readFileSync("./productos.json", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  creatteCart(newCart) {
    console.log(newCart);
    try {
      let all = this.getAllTrolley();
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
      let products = JSON.stringify(all);
      fs.writeFileSync("./itemstrolley.json", products);
      return id;
    } catch {
      console.log(err);
    }
  }

  addToCart(artId, body) {
    try {
      const trolleyDisp = this.getAllTrolley();
      //trae el carro por id
      const catchTrolley = this.getByIdCart(artId);
      //trae el producto por id
      const catchProduct = this.getByIdProductos(body);
      //traigo el indice del CarritoCompras
      const catchIn = trolleyDisp.findIndex((el) => el.id == artId);
      //a el carrittp del carrito le pusheo el preoductro
      catchTrolley.trolley.push(catchProduct);
      let newProduct = catchTrolley;
      trolleyDisp[catchIn] = newProduct;
      let products = JSON.stringify(trolleyDisp);
      fs.writeFileSync("./itemstrolley.json", products);
    } catch {
      console.log(err);
    }
  }
  deleteByIdAllTrolley(aBorrar) {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq1 = JSON.parse(datas);
      let buscaPborrar = datasq1.findIndex((el) => el.id == aBorrar);
      if (buscaPborrar >= 0) {
        datasq1.splice(buscaPborrar, 1);
        let documentAc = JSON.stringify(datasq1);
        fs.writeFileSync("./productos.txt", documentAc);
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

module.exports = { Contenedor, CarritoCompras };
