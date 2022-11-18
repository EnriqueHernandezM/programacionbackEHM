const socket = io();

const actualizarFeed = () => {
  const ingProduct = document.getElementById("ingProduct").value;
  const ingPrecio = document.getElementById("ingPrecio").value;
  const ingImg = document.getElementById("ingImagen").value;
  socket.emit("actualizame", { producto: ingProduct, precio: ingPrecio, imagen: ingImg });
};
const enviarMsg = () => {
  const email = document.getElementById("inputEmail").value;
  const msgeParaEnviar = document.getElementById("inputMsg").value;
  socket.emit("msg", { email: email, mensaje: msgeParaEnviar });
};

socket.on("connect", () => {
  console.log("quede conectado!");
});
socket.emit("on", {});

socket.on("listaMsgs", (data) => {
  let html = "";
  data.forEach((el) => {
    html += `
    <div>
      <p class="user"> User: ${el.email} dice: </p>
      <p class="mensaje" > ${el.mensaje} </p>
      <p class="hora"> ${el.now} </p>
    </div>
    `;
  });
  document.getElementById("boxMsges").innerHTML = html;
});
socket.on("feedAct", (data12) => {
  let html1 = "";
  data12.forEach((el) => {
    html1 += `
    <div>
      <p >  ${el.producto}  </p>
      <p> ${el.precio} </p>
        <img src="${el.imagen}" alt="">
    </div>
    `;
  });
  document.getElementById("probandoAct").innerHTML = html1;
});
