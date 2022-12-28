const socket = io();
//funcion para subir producto
const actualizarFeed = () => {
  const ingProduct = document.getElementById("ingProduct").value;
  const ingPrecio = document.getElementById("ingPrecio").value;
  const ingImg = document.getElementById("ingImagen").value;
  socket.emit("actualizame", { products: ingProduct, precio: ingPrecio, imagen: ingImg });
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

socket.on("connect", () => {
  console.log("quede conectado!");
});
socket.emit("on", {});
//renderiza mensajes
socket.on("listaMsgs", (data) => {
  let html = "";
  data.forEach((el) => {
    html += `
    <div>
      <p class="user"> User: ${el.author.nombre} dice: </p>
      <p class="mensaje" > ${el.text} </p>
     
    </div>
    `;
  });
  document.getElementById("boxMsges").innerHTML = html;
});
//renderiza productos
socket.on("feedAct", (data12) => {
  let html1 = "";
  data12.forEach((el) => {
    html1 += `
    <div>
      <p >  ${el.products}  </p>
      <p> ${el.precio} </p>
        <img src="${el.imagen}" alt="">
        <span onclick=deleteElement(${el.id});> 🗑️ </span>
    </div>
    `;
  });
  document.getElementById("probandoAct").innerHTML = html1;
});
//
////
///
//
