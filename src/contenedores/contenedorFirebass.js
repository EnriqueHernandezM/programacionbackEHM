const { json } = require("express");
const { connect, mongoose } = require("mongoose");
const Productos = require("../models/mongo/productos");
mongoose.set("strictQuery", true);

//CONTENEDOR PARA GUARDAN EN mONGOAtlas
class ContenedorFire {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  async connectMG() {
    try {
      await connect("mongodb+srv://enriquehm:0h47RMcEkqCLHjTP@cluster0.ckqspop.mongodb.net/ecommerce?retryWrites=true&w=majority");
      console.log("conecte");
    } catch (e) {
      console.log(e);
      throw "can not connect to the db";
    }
  }
  async save(producto) {
    try {
      await this.connectMG();
      //producto = JSON.stringify(producto);
      console.log(producto);
      const newProduct = new Productos(producto);
      await newProduct.save().then((data) => console.log(data));
    } catch {
      console.log(err);
    }
  } /*  */
  getById(number) {
    try {
      const datas = fs.readFileSync(this.routPersistance, "utf-8");
      let datasq = JSON.parse(datas);
      let buscaPmostrar = datasq.findIndex((el) => el.id == number);
      return buscaPmostrar > -1 ? datasq.find((el) => el.id == number) : { error: "producto no encontrado" };
    } catch {
      console.log(err);
    }
  }
  async getAll() {
    try {
      this.connectMG();
      const prod = await Productos.find({});
      console.log(prod);
      return prod;
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
        let documentAc = JSON.stringify(datas);
        fs.writeFileSync(this.routPersistance, documentAc);
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
      fs.writeFileSync(this.routPersistance, JSON.stringify([]), console.log("Archivo vaciado correctamente"));
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
        fs.writeFileSync(this.routPersistance, products);
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
      const aggregates = fs.readFileSync(this.routPersistance, "utf-8");
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
  // UNICA QUE SOLICITA CON RUTA FIJA BUSCAR SOLUCION
  getByIdProductos(number) {
    try {
      const datas = fs.readFileSync("productos.json", "utf-8");
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
      let products = JSON.stringify(all);
      fs.writeFileSync(this.routPersistance, products);
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
      let products = JSON.stringify(trolleyDisp);
      fs.writeFileSync(this.routPersistance, products);
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
        let documentAc = JSON.stringify(datasq1);
        fs.writeFileSync(this.routPersistance, documentAc);
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
        let documentAc = JSON.stringify(trolleyDisp);
        fs.writeFileSync(this.routPersistance, documentAc);
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
module.exports = ContenedorFire;
