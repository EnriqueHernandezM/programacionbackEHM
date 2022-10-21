let fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  save(producto) {
    try {
      this.archivo.push(producto);
      let ids = this.archivo.map((el) => el.id);
      console.log(`estos son los ID asignados respectivamente ${ids}`);
      let product = JSON.stringify(this.archivo); /*  */
      fs.writeFileSync("./productos.txt", product);
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datas = fs.readFileSync("./productos.txt", "utf-8");
      let datasq = JSON.parse(datas);
      return datasq.find((el) => el.id === number);
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
      datasq1.splice(buscaPborrar, 1);
      let documentAc = JSON.stringify(datasq1);
      fs.writeFileSync("./productos.txt", `${documentAc}`);
    } catch {
      console.log(err);
    }
  }
  deleteAll() {
    try {
      fs.unlink("./productos.txt", () => {
        console.log("archivo eliminado con exito");
      });
    } catch {
      console.log(err);
    }
  }
}

const guardarProducto = new Contenedor([{ producto: "Bacardi", precio: 215, id: 1 }]);
guardarProducto.save({ producto: "Absolut Vodka", precio: 225, id: 2 });
guardarProducto.save({ producto: "Capitan Morgan", precio: 185, id: 3 });
guardarProducto.save({ producto: "SKY Blue", precio: 420, id: 4 });

let buscarPorId = guardarProducto.getById(4);
let arrayCobjetos = guardarProducto.getAll();
//borrar u solo elemento
guardarProducto.deleteById(2);
console.log(buscarPorId);
console.log(arrayCobjetos);
//SACAR COMENTARIO P/PROBAR DELETE ALL
//guardarProducto.deleteAll();
