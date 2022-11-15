const { json } = require("express");

let fs = require("fs");
class Contenedor {
  constructor() {}
  save(producto) {
    try {
      let all = this.getAll();
      let id = 1;
      all.length > 0 &&
        all.forEach((el) => {
          id = el.id + 1;
        });
      producto.id = id;
      all.push(producto);
      let products = JSON.stringify(all);
      fs.writeFileSync("./productos.txt", products);
      return all;
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > 0 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  getAll() {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
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
  deleteAll() {
    try {
      fs.writeFileSync("./productos.txt", JSON.stringify([]), console.log("Archivo vaciado correctamente"));
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
        fs.writeFileSync("./productos.txt", products);
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
      actually.push(obj);
      const saver = JSON.stringify(obj);
      fs.writeFileSync("mensajes.txt", saver);
    } catch {
      console.log(err);
    }
  }
}

module.exports = Contenedor;
