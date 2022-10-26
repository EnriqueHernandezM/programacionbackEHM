let fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  save(producto) {
    try {
      const id = this.archivo.length + 1;
      this.archivo.push(producto);
      producto.id = id;
      let product = JSON.stringify(this.archivo);
      fs.writeFileSync("./productos.txt", product);
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > 0 ? datasq.find((el) => el.id == number) : console.log("producto no existe");
    } catch {
      console.log(err);
    }
  }
  getAll() {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq = JSON.parse(datas);
      return datasq;
    } catch (err) {
      console.log(err);
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
}

const guardarProducto = new Contenedor([]);

guardarProducto.save({ producto: "Absolut Vodka", precio: 225 });
guardarProducto.save({ producto: "Capitan Morgan", precio: 185 });
guardarProducto.save({ producto: "SKY Blue", precio: 420 });
guardarProducto.save({ producto: "Red Label", precio: 620 });
guardarProducto.save({ producto: "Jimador", precio: 650 });
guardarProducto.save({ producto: "Corralejo", precio: 820 });

let buscarPorId = guardarProducto.getById(5);
let arrayCobjetos = guardarProducto.getAll();
//borrar u solo elemento
//guardarProducto.deleteById(2);
console.log(buscarPorId);
console.log(arrayCobjetos);
//SACAR COMENTARIO P/PROBAR DELETE ALL
//guardarProducto.deleteAll();

module.exports = arrayCobjetos;
