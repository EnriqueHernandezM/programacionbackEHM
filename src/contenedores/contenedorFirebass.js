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
      const res = await db.collection(this.routPersistance).get();
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
    } catch (err) {
      console.log(err);
    }
  } /*  */
  async getById(number) {
    try {
      const res = db.collection(this.routPersistance).doc(number);
      let x = await res.get();
      return { id: x.id, ...x.data() };
    } catch {
      console.log(err);
    }
  }
  async deleteById(aBorrar) {
    try {
      const elimin = await db.collection(this.routPersistance).doc(aBorrar).delete();
      return elimin;
    } catch (err) {
      console.log(err);
    }
  }
  async modifyElement(id, body) {
    try {
      const refDocument = db.collection(this.routPersistance).doc(id);

      const object = {
        ...body,
        date: new Date().toLocaleDateString(),
      };
      await refDocument.update(object);
      return refDocument;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllForItemsTrolley(idC) {
    try {
      const res = db.collection(this.routPersistance).doc(idC);
      let x = await res.get();
      let z = x.data();
      console.log(x.data());
      return z.trolley;
    } catch (err) {
      return { error: err, conten: "al parecer no hay ningun carrito " };
    }
  }
  // UNICA QUE SOLICITA CON RUTA FIJA BUSCAR SOLUCION
  async getByIdProductos(number) {
    try {
      const res = db.collection("productos").doc(number);
      let x = await res.get();
      return { id: x.id, ...x.data() };
    } catch (err) {
      console.log(err);
    }
  }
  //no pude hacerla retornar id que asigna
  async creatteCart(newCart) {
    try {
      const object = {
        trolley: [newCart],
        date: new Date().toLocaleDateString(),
      };
      let res = await db.collection("carritos").doc().set(object);
      console.log(res);
      let iDCarritosDisp = await this.getAll();
      let x = iDCarritosDisp.map((el) => {
        return el.id;
      });
      console.log(x);
      return { idsCarritosDisponibles: x };
    } catch (err) {
      console.log(err);
    }
  }
  async addToCart(artId, body) {
    try {
      let trarCarrito = await this.getAllForItemsTrolley(artId);
      let catchProduct = await this.getByIdProductos(body);
      const acumuladorProductos = [];
      acumuladorProductos.push(catchProduct, ...trarCarrito);
      let agregar = await db.collection("carritos").doc(artId).update({ trolley: acumuladorProductos });
      return agregar;
    } catch (err) {
      console.log(err);
    }
  }
  //borrar Todo el carrito
  async deleteByIdAllTrolley(aBorrar) {
    try {
      const res = await db.collection(this.routPersistance).doc(aBorrar).delete();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteByIdAllTrolleyItem(idTrolley, idItem) {
    try {
      /////////
      const trolleyC = await this.getAllForItemsTrolley(idTrolley);
      let trolleyDelete = trolleyC.find((el) => el.id == idItem);
      trolleyC.splice(trolleyDelete, 1);
      console.log(trolleyC);
      let agregar = await db.collection("carritos").doc(idTrolley).update({ trolley: trolleyC });
      return agregar;
    } catch (err) {
      console.log(err);
    }
  }
  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
module.exports = ContenedorFire;
