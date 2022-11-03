let fs = require("fs");
class Contenedor {
  constructor() {}
  save(producto) {
    try {
      let all = this.getAll();
      const id = all.length + 1;
      producto.id = id;
      all.push(producto);
      let products = JSON.stringify(all);
      fs.writeFileSync("./productos.txt", products);
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
  getAll(act) {
    try {
      switch (act) {
        case undefined:
          const datas = fs.readFileSync("./productos.txt", "utf-8");
          return JSON.parse(datas);
        case "./perfiles.txt":
          const datasP = fs.readFileSync(act, "utf-8");
          return JSON.parse(datasP);
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
      buscaPborrar > 0 ? datasq1.splice(buscaPborrar, 1) : console.log("producto no existe");
      let documentAc = JSON.stringify(datasq1);
      fs.writeFileSync("./productos.txt", `${documentAc}`);
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
  saveUser(product) {
    try {
      let all = this.getAll("./perfiles.txt");
      const id = all.length + 1;
      product.id = id;
      all.push(product);
      let products = JSON.stringify(all);
      fs.writeFileSync("./perfiles.txt", products);
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
        console.log("mo");
        return { err: true, msg: "producto a modificar no existe" };
      }
    } catch {
      console.log(err);
    }
  }
}

module.exports = Contenedor;
