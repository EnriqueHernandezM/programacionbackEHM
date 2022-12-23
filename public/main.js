////
////// funciones front para los productos
////
const renderProducts = () => {
  fetch("http://localhost:8081/api/productos")
    .then((res) => res.json())
    .then((json) => {
      let html = "";
      json.forEach((el) => {
        html += `
    <div class="d-flex flex-column  w-50 text-center p-2">
    <p><img class="w-25" src="${el.imagen}"/> </p>    
      <p class="mensaje" > ${el.producto} </p>
      <p class="description p-5"> ${el.description} </p>
      <p class="hora"> $${el.precio} </p>
      <span onclick=addArticleTrolley(${el.id || el._id});>agregar a carrito🛒 necesitas poner id de carrito arriba </span>
      <span onclick=renderFormActProduct("${el.id || el._id}");> modificar producto 🔃 </span>
      <span onclick=deleteItemForId("${el.id || el._id}");> eliminar producto 🗑️ </span>
      
    </div>
    `;
      });
      document.getElementById("productos").innerHTML = html;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
const renderForId = () => {
  const idWatch = document.getElementById("inputPfuncionesConCarritopushearProducto").value;
  let url = "http://localhost:8081/api/productos/";
  fetch(url + idWatch)
    .then((res) => res.json())
    .then((json) => {
      let html = "";
      html += `
    <div class="d-flex flex-column  w-50 text-center p-2">
    <p><img class="w-25" src="${json.imagen}"/> </p>    
      <p class="mensaje" > ${json.producto} </p>
      <p class="description p-5"> ${json.description} </p>
      <p class="hora"> $${json.precio} </p>
      <span onclick=addArticleTrolley("${json.id || json._id}");>agregar a carrito 🛒 </span>
      <span onclick=renderFormActProduct("${json.id || json._id}"});> modificar producto 🔃 </span>
      <span onclick=deleteItemForId("${json.id || json._id}");> eliminar producto 🗑️ </span>
      <p class="ps-5 ms-5"> ID:${json.id || json._id} </p>
    </div>
    `;

      document.getElementById("productos").innerHTML = html;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
const newProduct = () => {
  const nameProductNew = document.getElementById("ingProduct").value;
  const newPriceProduct = document.getElementById("ingPrecio").value;
  const newImageProduct = document.getElementById("ingImagen").value;
  const newDescriptionProduct = document.getElementById("ingDescription").value;
  const newStockProduct = document.getElementById("ingStock").value;
  const newCodeItem = document.getElementById("ingCodeItem").value;
  fetch("http://localhost:8081/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      producto: nameProductNew,
      precio: newPriceProduct,
      imagen: newImageProduct,
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
    });
};
//
//
const renderFormActProduct = (number) => {
  fetch("http://localhost:8081/api/productos")
    .then((res) => res.json())
    .then((json) => {
      let x = json.find((el) => el.id == number);

      let htmlFormActProduct = "";
      htmlFormActProduct += `
  <div class="container-fluid mt-5">
  <div class="row p-5 ps-2">
  <div class="col text-white ms-5 text-center">
  <h1>Editar Un Producto</h1>
  </div>
  </div>
  <div class="row p-5">
  <div class="col-xs-12 col-md-6 col-lg-4">
  <p class="text-white P-2">id del producto</p>
  <input id="idAedit" type="text" placeholder="${x.id || x._id}" class="w-75"
   value="${x.id || x._id}" />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
  <p class="text-white P-2">Nombre del Licor</p>
  <input id="updateProduct" type="text"  placeholder="${x.producto}" class="w-75"
  value="${x.producto}" />
  </div>
  <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">precio del producto</p>
      <input id="updatePrecio" type="number" placeholder="${x.precio}"  class="w-50"
      value="${x.precio}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa URL de imagen</p>
      <input id="updateImagen" type="text" placeholder="${x.imagen}" class="w-100" value="${x.imagen}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa Descripcion del producto</p>
      <input id="updateDescription" type="text" placeholder="${x.description}" class="w-100" value="${x.description}" />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa stock disponible</p>
      <input id="updateStock" type="number" placeholder="${x.stockItems}" class="w-100"value="${x.stockItems}"  />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa CodeItem</p>
      <input id="updateCodeItem" type="number" placeholder="${x.codeItem}" class="w-100"value="${x.codeItem}"  />
      </div>
      <div class="col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center ps-5 ms-5">
      <input type="submit" onclick="updateProduct()" value="update products" />
      </div>   
      </div>  
      </div>
      `;
      document.getElementById("formularoParaActualizar").innerHTML = htmlFormActProduct;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
const updateProduct = () => {
  const idToEdit = document.getElementById("idAedit").value;
  const updateProduct = document.getElementById("updateProduct").value;
  const updatePrecio = document.getElementById("updatePrecio").value;
  const updateImagen = document.getElementById("updateImagen").value;
  const updateDescription = document.getElementById("updateDescription").value;
  const updateStock = document.getElementById("updateStock").value;
  const updateCodeItem = document.getElementById("updateCodeItem").value;

  let url = "http://localhost:8081/api/productos/";
  fetch(url + idToEdit, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      producto: updateProduct,
      precio: updatePrecio,
      imagen: updateImagen,
      description: updateDescription,
      stockItems: updateStock,
      codeItem: updateCodeItem,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
const deleteItemForId = (idDelete) => {
  let url = "http://localhost:8081/api/productos/";
  fetch(url + idDelete, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
///
/////
///
////
////// funciones front para El carrito de compras
////
const renderTrolley = () => {
  //MODIFICAMOS ESTA VARIABLE SI QUEREMES RENDERIIZAR OTRO CARRITO
  const idTrolleyRender = document.getElementById("inputPfuncionesConCarrito").value;
  let url = "http://localhost:8081/api/carritoDeCompras/";
  fetch(url + idTrolleyRender + "/productos")
    .then((res) => res.json())
    .then((json) => {
      let htmlCart = "";
      json.forEach((el) => {
        htmlCart += `
  <div class="d-flex flex-column  w-50 text-center">
  <p><img class="w-25" src="${el.imagen}"/> </p>    
    <p class="mensaje" > ${el.producto} </p>
    <p class="description"> ${el.description} </p>
    <p class="hora"> ${el.precio} </p>
    
    <span onclick=deleteItemTrolley(${el.id || el._id}})> 🗑️ </span>
  </div>
  `;
      });
      document.getElementById("productosCarrito").innerHTML = htmlCart;
    })
    .catch((e) => {
      console.log(e + "error");
    });
};
const CreateNewTrolley = () => {
  fetch("http://localhost:8081/api/carritoDeCompras", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      alert("para guardar productos en tu carrito coloca tu ID en el siguiente contendor" + " " + "tu ID" + " :" + res.idAsignado);
    });
};
const addArticleTrolley = (idAdd) => {
  //MODIFICAMOS ESTA VARIABLE SI QUEREMOS PUSHEAR ENN OTRO CARRITO
  const idReq = document.getElementById("inputPfuncionesConCarritopushearProducto").value;
  const url = "http://localhost:8081/api/carritoDeCompras/";
  fetch(url + idReq + "/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: idAdd }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
const deleteTrolley = (idD) => {
  idD = document.getElementById("inputPfuncionesConCarrito").value;
  let url = "http://localhost:8081/api/carritoDeCompras/";
  fetch(url + idD, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
const deleteItemTrolley = (idItem) => {
  let idCarritoA = document.getElementById("inputPfuncionesConCarrito").value;
  let url = "http://localhost:8081/api/carritoDeCompras/";
  fetch(url + idCarritoA + "/productos/" + idItem, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};
///
/////
///
