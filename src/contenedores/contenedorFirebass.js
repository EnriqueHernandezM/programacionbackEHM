const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../privi.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("conecte");
const db = getFirestore();
//CONTENEDOR PARA GUARDAN EN FIREBAS
class ContenedorFire {
  constructor(routPersistance) {
    this.routPersistance = routPersistance;
  }
  async getAll() {
    try {
      const res = await db.collection("productos").get();
      let arrayRes = res.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return arrayRes;
    } catch (err) {
      return { error: err };
    }
  }
  async save(producto) {
    try {
      let res;
      const object = {
        ...producto,
        date: new Date().toLocaleDateString(),
      };
      res = await db.collection("productos").doc().set(object);
      return res;
    } catch {
      console.log(err);
    }
  } /*  */
  async getById(number) {
    try {
      const res = db.collection(this.routPersistance).doc(number);
      let x = await res.get();
      console.log(x.data());
      return { id: x.id, ...x.data() };
    } catch {
      console.log(err);
    }
  }
  deleteById(aBorrar) {
    try {
      db.collection(this.routPersistance).doc(aBorrar).delete();
      return { idItemEiminado: "ok" };
    } catch {
      console.log(err);
    }
  }
  async modifyElement(id, body) {
    try {
      const refDocMati = db.collection(this.routPersistance).doc(id);
      const object = {
        ...body,
        date: new Date().toLocaleDateString(),
      };
      const res = await refDocMati.update(object);
      return res;
    } catch {
      console.log(err);
    }
  }
  async getAllForItemsTrolley(idC) {
    try {
      let catchTrolley = this.getById(idC);
      return catchTrolley;
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  // UNICA QUE SOLICITA CON RUTA FIJA BUSCAR SOLUCION
  async getByIdProductos(number) {
    try {
      const res = db.collection("productos").doc(number);
      let x = await res.get();
      console.log(x.data());
      return { id: x.id, ...x.data() };
    } catch {
      console.log(err);
    }
  }
  async creatteCart(newCart) {
    try {
      let res;
      const object = {
        trolley: [newCart],
        date: new Date().toLocaleDateString(),
      };
      res = await db.collection("carritos").doc().set(object);
      console.log({ id: res.id });
      return { id: res.id };
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
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
module.exports = ContenedorFire;
