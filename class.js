let fs = require("fs");

const getById = (number) => {
  try {
    const datas = fs.readFileSync("./productos.txt", "utf-8");
    let datasq = JSON.parse(datas);
    let buscaPmostrar = datasq.findIndex((el) => el.id == number);
    return buscaPmostrar > 0 ? datasq.find((el) => el.id == number) : console.log("producto no existe");
  } catch {
    console.log(err);
  }
};
const getAll = () => {
  try {
    const datas = fs.readFileSync("./productos.txt", "utf-8");
    let datasq = JSON.parse(datas);
    return datasq;
  } catch (err) {
    console.log(err);
  }
};
const deleteById = (aBorrar) => {
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
};
const deleteAll = () => {
  try {
    fs.writeFileSync("./productos.txt", JSON.stringify([]), console.log("Archivo vaciado correctamente"));
  } catch {
    console.log(err);
  }
};

let getAllOk = getAll();
module.exports = getAllOk;
