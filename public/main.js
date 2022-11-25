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
    <div class="d-flex flex-column  w-50 text-center">
    <p><img class="w-25" src="${el.imagen}"/> </p>    
      <p class="mensaje" > ${el.producto} </p>
      <p class="description"> ${el.description} </p>
      <p class="hora"> ${el.precio} </p>
      <span onclick=addArticleTrolley(${el.id});> 🛒 </span>
      <span onclick=renderFormActProduct();> 🔃 </span>
      <span onclick=deleteItemForId(${el.id});> 🗑️ </span>
    </div>
    `;
      });
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
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("ProductoagregadoCorrectamente");
    });
};
const renderFormActProduct = () => {
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
      <input id="idAedit" type="text"  placeholder="Ingresa id Del producto a editar " class="w-75"
        required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">Nombre del Licor</p>
      <input id="updateProduct" type="text"  placeholder="Ingresa nombre del producto " class="w-75"
        required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">precio del producto</p>
      <input id="updatePrecio" type="number" placeholder="ingresa el precio del producto"  class="w-50"
        required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa URL de imagen</p>
      <input id="updateImagen" type="text"  class="w-100" required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa Descripcion del producto</p>
      <input id="updateDescription" type="text"  class="w-100" required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-4">
      <p class="text-white P-2">ingresa stock disponible</p>
      <input id="updateStock" type="number"  class="w-100" required="true" />
    </div>
    <div class="col-xs-12 col-md-6 col-lg-12 P-4 mt-5 text-center ps-5 ms-5">
      <input type="submit" onclick="updateProduct()" value="update products" />
    </div>   
    </div>  
</div>

  `;
  document.getElementById("formularoParaActualizar").innerHTML = htmlFormActProduct;
};
const updateProduct = () => {
  const idToEdit = document.getElementById("idAedit").value;
  const updateProduct = document.getElementById("updateProduct").value;
  const updatePrecio = document.getElementById("updatePrecio").value;
  const updateImagen = document.getElementById("updateImagen").value;
  const updateDescription = document.getElementById("updateDescription").value;
  const updateStock = document.getElementById("updateStock").value;
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
    
    <span onclick=deleteItemTrolley(${el.id})> 🗑️ </span>
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
      console.log(res);
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
