let fs = require("fs");
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
  creador(producto) {
    this.archivo.push(producto);
    let product = JSON.stringify(this.archivo);
    fs.writeFileSync("./productos.txt", `${product}\n`);
  }
  save2(productA) {
    this.archivo.push(productA);
    productA = JSON.stringify(this.archivo);
    fs.appendFileSync("./productos.txt", `${productA}\n`);
  }
  deleteAll() {
    fs.unlinkSync("./productos.txt");
  }
}

const primerProducto = new Contenedor([{ producto: "AAAA", precio: 111, id: 3 }]);

primerProducto.creador({ producto: "AAAA", precio: 111, id: 3 });
primerProducto.save2({ producto: "FFFA", precio: 111, id: 3 });
//let borrarArchivoTxt = primerProducto.deleteAll();
let Datas = fs.readFileSync("./productos.txt", "utf-8");
console.log(Datas);
