const socket = io();
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
//funcion para subir producto
const actualizarFeed = () => {
  const ingProduct = document.getElementById("ingProduct").value;
  const ingPrecio = document.getElementById("ingPrecio").value;
  const ingImg = document.getElementById("ingImagen").value;
  socket.emit("actualizame", { producto: ingProduct, precio: ingPrecio, imagen: ingImg });
};
//funcion para enviar mensaje
const enviarMsg = () => {
  const email = document.getElementById("inputEmail").value;
  const msgeParaEnviar = document.getElementById("inputMsg").value;
  const avatarImagen = document.getElementById("avatarImagen").value;
  const nombreUser = document.getElementById("Nombre").value;
  const apellidoUser = document.getElementById("apellido").value;
  const edadUser = document.getElementById("edad").value;
  const aliasUser = document.getElementById("alias").value;
  socket.emit("msg", { idmail: email, text: msgeParaEnviar, avatar: avatarImagen, nombre: nombreUser, apellido: apellidoUser, edad: edadUser, alias: aliasUser });
};
//funcion para llamar eliminar producto
const deleteElement = (idAb) => {
  socket.emit("deleteElement", idAb);
};
///
///ESQUEMA
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "idmail" });
const messageSchema = new schema.Entity("texts", {
  author: authorSchema,
});
///
/* const userLogin = () => {
  const nombreDeUser = document.getElementById("userLog").value;
  const contraseniaDeUser = document.getElementById("contraseniaLog").value;
  fetch("http://localhost:8081/loguear1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombreUserLog: nombreDeUser,
      contraseñaLog: contraseniaDeUser,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error == true) {
        console.log(error);
      }
     
    });
};
/// */

const messageSchemaOk = [messageSchema];
///
///
socket.on("connect", () => {
  console.log("quede conectado!");
});
socket.emit("on", {});
//renderiza mensajes
socket.on("listaMsgs", (data) => {
  let html = "";
  const normalizedCount = document.getElementById("normalizados");
  const denormalizedCount = document.getElementById("desnormalizados");
  //////DESNORMALIZAMOS
  const denormalized = denormalize(data.result, messageSchemaOk, data.entities);
  normalizedCount.innerHTML = JSON.stringify(data).length;
  denormalizedCount.innerHTML = JSON.stringify(denormalized).length;
  console.log(denormalized);
  denormalized.forEach((el) => {
    html += `
    <div>
      <p class="user"> <img class="imgchat" src="${el.author.avatar}" alt="">User: ${el.author.idmail} dice: </p>
      <p class="mensaje" > ${el.text} </p>
        
    </div>
    `;
  });
  document.getElementById("boxMsges").innerHTML = html;
});
///
///
//
//renderiza productos
socket.on("feedAct", (data12) => {
  let html1 = "";
  data12.forEach((el) => {
    html1 += `
    <div>
      <p >  ${el.producto}  </p>
      <p> ${el.precio} </p>
        <img src="${el.imagen}" alt="">
        <span onclick=deleteElement("${el._id}");> 🗑️ </span>
    </div>
    `;
  });
  document.getElementById("probandoAct").innerHTML = html1;
});
//
////

///
//
