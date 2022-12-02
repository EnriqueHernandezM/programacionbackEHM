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
  socket.emit("msg", { email: email, mensaje: msgeParaEnviar });
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
      <p class="user"> User: ${el.email} dice: </p>
      <p class="mensaje" > ${el.mensaje} </p>
      <p class="hora"> ${el.time} </p>
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
