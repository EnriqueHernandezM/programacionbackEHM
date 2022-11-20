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
      let codeItem = this.random(1000000, 1000000);
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
      if (product >= 0) {
        all[product] = body;
        let products = JSON.stringify(all);
        fs.writeFileSync("./productos.json", products);
        return { res: true, msg: "producto correctamente modificado", producto: body };
      }
      if (product == -1) {
        console.log("err");
        return { err: true, msg: "producto a modificar no existe" };
      }
    } catch {
      console.log(err);
    }
  }
  readMsgs() {
    const everybodyMsges = fs.readFileSync("mensajes.txt", "utf-8");
    if (everybodyMsges) {
      return JSON.parse(everybodyMsges);
    } else {
      return [];
    }
  }
  saveMsges(obj) {
    try {
      const actually = this.readMsgs();
      let data = DateTime.local();
      obj.data = data;
      actually.push(obj);
      const saver = JSON.stringify(obj);
      fs.writeFileSync("mensajes.txt", saver);
    } catch {
      console.log(err);
    }
  }
}

class CarritoCompras {
  constructor() {}
  getAllTrolley() {
    try {
      const aggregates = fs.readFileSync("./itemstrolley.json", "utf-8");
      if (aggregates) {
        return JSON.parse(aggregates);
      } else {
        return {};
      }
    } catch (err) {
      return { error: err };
    }
  }
  getByIdCart(number) {
    try {
      const datas = fs.readFileSync("./productos.json", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  addToCart(cant) {
    let carrCreate = DateTime.local();
    const idForItem = this.getByIdCart(cant.idPc);
    const existing = this.getAllTrolley();
    let carritoId = 1;
    existing.length > 0 &&
      existing.forEach((el) => {
        carritoId = el.carritoId + 1;
      });
    existing.carrCreate = carrCreate;
    existing.carritoId = carritoId;
    existing.push(...existing, idForItem);
    let products = JSON.stringify(existing);
    fs.writeFileSync("./itemstrolley.json", products);
    return existing;
  }
}

module.exports = { Contenedor, CarritoCompras };
