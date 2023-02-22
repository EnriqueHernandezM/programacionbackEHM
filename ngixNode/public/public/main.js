const socket = io();
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
//funcion para subir producto
const renderUpdateProductos = () => {
  let htmlUpdate = "";
  htmlUpdate += `
  <div class="row p-5 ps-2">
        <div class="col text-white ms-5 text-center">
          <h1>Agregar Un Nuevo Producto</h1>
        </div>
      </div>
      <form enctype="multipart/form-data" method="POST" class="row p-5" onsubmit="actualizarFeed();return false;">
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">Nombre del Licor</p>
          <input id="ingProduct" type="text" name="producto" placeholder="Ingresa nombre del producto " class="w-75" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">precio del producto</p>
          <input id="ingPrecio" type="number" placeholder="ingresa el precio del producto" name="precio" class="w-50" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">ingresa URL de imagen</p>
          <input id="ingImagen" type="text" name="imagen" class="w-100" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center ps-5 ms-5">
          <input type="submit" value="Upload productos" />
        </div>
      </form>`;
  document.getElementById("renderUpdateProductos").innerHTML = htmlUpdate;
};

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
  socket.emit("msg", {
    idmail: email,
    text: msgeParaEnviar,
    avatar: avatarImagen,
    nombre: nombreUser,
    apellido: apellidoUser,
    edad: edadUser,
    alias: aliasUser,
  });
};
//funcion para llamar eliminar producto
const deleteElement = (idAb) => {
  socket.emit("deleteElement", idAb);
};
///
const addArticleTrolley = (idAdd) => {
  fetch("http://localhost:8080/api/carrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: idAdd }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
///////////////////////////////////////////////////////////////buscador Por Nombre
const buscadorItems = () => {
  fetch("http://localhost:8080/api/productos")
    .then((res) => res.json())
    .then((json) => {
      let entradaAbuscar = document.getElementById("ingresoBuscadorItems").value;
      document.getElementById("ingresoBuscadorItems").value = "";
      const inventarioVinateria = json.filter((el) => el.producto.includes(entradaAbuscar[0].toUpperCase()));
      let html1 = "";
      inventarioVinateria.forEach((el) => {
        html1 += `
        <div>
        <img src="${el.imagen}" alt="">
          <p >  ${el.producto}  </p>
          <p> $ ${el.precio} </p>
          <span  onclick=addArticleTrolley("${el._id}");> agregar al 🛒 </span>
          <span  onclick=deleteElement("${el._id}");>borrar 🗑️ </span>
        </div>
        `;
      });
      document.getElementById("probandoAct").innerHTML = html1;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////fetch CARRITO PEDIDO
/* const pagarCarrito = () => {
  fetch("http://localhost:8080/api/carrito/confirmarcompra")
    .then((res) => res.json())
    .then((res) => {
      console.log(res.usuario);
      /*  res.forEach((el) => {
        console.log(el);
      }); 
    })
    .catch((e) => {
      console.log(e);
    });
}; */
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
    <img src="${el.imagen}" alt="">
      <p >  ${el.producto}  </p>
      <p> $ ${el.precio} </p>
      <span  onclick=addArticleTrolley("${el._id}");> agregar al 🛒 </span>
      <span  onclick=deleteElement("${el._id}");>borrar 🗑️ </span>
    </div>
    `;
  });
  document.getElementById("probandoAct").innerHTML = html1;
});
//
////
///
//
