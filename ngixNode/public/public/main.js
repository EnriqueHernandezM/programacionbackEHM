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
      <form enctype="multipart/form-data" method="POST" class="row p-5" onsubmit="newProduct();return false;">
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">Nombre del Licor</p>
          <input id="newIngProduct" type="text" name="product" placeholder="Ingresa nombre del producto " class="w-75" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa tipo de licor</p>
        <input id="newTypeLicor" type="text" name="typeOfLiquor" class="w-100" required="true" />
      </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">precio del producto</p>
          <input id="newIngPrecio" type="number" placeholder="ingresa el precio del producto" name="price" class="w-50" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
          <p class="text-white P-2">ingresa URL de imagen</p>
          <input id="newIngImage" type="text" name="image" class="w-100" required="true" />
        </div>
        <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa stock disponible</p>
        <input id="newIngStock" type="number" name="stockItems" class="w-100" required="true" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa CodeItem</p>
        <input id="newIngCodeItem" type="number" name="codeItem" class="w-100" required="true" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
        <p class="text-white P-2">ingresa Descripcion del producto</p>
        <input id="newIngDescription" type="text" name="description" class="w-100" required="true" />
      </div>
        <div class="col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center ps-5 ms-5">
          <input type="submit" value="Upload product" />
        </div>
      </form>`;
  document.getElementById("renderUpdateProducts").innerHTML = htmlUpdate;
};

const newProduct = () => {
  const nameProductNew = document.getElementById("newIngProduct").value;
  const typeOfLicor = document.getElementById("newTypeLicor").value;
  const newPriceProduct = document.getElementById("newIngPrecio").value;
  const newImageProduct = document.getElementById("newIngImage").value;
  const newDescriptionProduct = document.getElementById("newIngDescription").value;
  const newStockProduct = document.getElementById("newIngStock").value;
  const newCodeItem = document.getElementById("newIngCodeItem").value;
  fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: nameProductNew,
      typeOfLiquor: typeOfLicor,
      price: newPriceProduct,
      image: newImageProduct,
      description: newDescriptionProduct,
      stockItems: newStockProduct,
      codeItem: newCodeItem,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error == true) {
        alert("reservado solo para administradores");
      }
      if (res.ok) {
        alert("ProductoagregadoCorrectamente");
      }
    })
    .catch((e) => {
      console.log(e);
    });
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
  let url = "http://localhost:8080/api/productos/";
  fetch(url + idAb, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.eliminated == "ok") {
        window.location.href = window.location.href;
      }
    });
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
          <span  onclick=deleteElement("${el._id}||${el._id}");>borrar 🗑️ </span>
        </div>
        `;
      });
      document.getElementById("probandoAct").innerHTML = html1;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
///////////////////////////////////////////////////////////////////////////////DELETE ITEMS TROLLEY
const deleteItemTrolley = (idItem) => {
  let url = "http://localhost:8080/api/carritodelete/";
  fetch(url + idItem, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.eliminated == "ok") {
        window.location.href = window.location.href;
      }
    });
};
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

//
////
///
//
