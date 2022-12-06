import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
//console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoUrl = document.getElementById("URL");
let formularioProducto = document.querySelector("#formProduto");
let btnNuevo = document.getElementById("btnNuevo");
let btnDatosPrueba = document.getElementById("btnDatosPrueba");

let productoExistente = false; //variable bandera: si es false quiere crear producto y si true quiero modicar Producto
//Si hay productos en localstorage, quiero guardar en el array de productos y si no que sea un array vacio.
let listaProductos = JSON.parse(localStorage.getItem("arrayProductoKey")) || [];

//asociar un evento a cada elemento obtenido
campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});

campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCantidad.addEventListener("blur", () => {
  console.log("desde cantidad");
  validarNumeros(campoCantidad);
});
campoUrl.addEventListener("blur", () => {
  console.log("desde url");
  validarURL(campoUrl);
});

formularioProducto.addEventListener("submit", guardarProducto);
btnNuevo.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba);

//invoco a cargaInicial: si tengo productos en el localStorage los mustra en la tabla.
cargaInicial();

//empieza la lógica del crud

function guardarProducto(e) {
  //prevenir el actualizar del submit
  e.preventDefault();
  //verificar que todos los datos sean validos
  if (
    validarGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoUrl
    )
  ) {
    // console.log("los datos fueron enviados correctamente");
    if (productoExistente === false) {
      //crear producto
      crearProducto();
    } else {
      //modificar producto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crarCodigoUnico() función que retorna un código único ---> codUnico
  //crear un objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoUrl.value
  );

  console.log(productoNuevo);
  //guardar cada objeto (producto) en un array de productos
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //limpiar formulario
  limpiarFormulario();
  //guardar el array de productos dentro de localStorage
  guardarLocalStorage();
  //mostrar un cartel al usuario
  Swal.fire(
    "Producto creado!",
    "Su producto fue creado correctamente",
    "success"
  );
  //cargar el/los productos en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value del formulario
  formularioProducto.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoUrl.className = "form-control";

  //resetear la variable bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayProductoKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.querySelector("#tablaProducto");
  //se usa el operador de asiganción de adición para concatenar con las filas que ya tengo
  tablaProducto.innerHTML += `<tr> 
  <th>${producto.codigo}</th>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicionProducto('${producto.codigo}')">Editar</button>
    <button class="btn btn-danger" onclick='borrarProducto("${producto.codigo}")'>Borrar</button>
 </td>
</tr>`;
}

function cargaInicial() {
  if (listaProductos.length > 0) {
    //crear filas
    //listaProductos.forEach((itemProducto) => {crearFila(itemProducto);});
    listaProductos.map((itemProducto) => {
      crearFila(itemProducto);
    });
  }
}

window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  //buscar el producto en el array
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === codigo;
  });
  console.log(productoBuscado);
  //mostrar el producto en el formulario de Producto
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoUrl.value = productoBuscado.url;

  //cambiar la variable bandera productoExistente
  productoExistente = true;
};

function modificarProducto() {
  console.log("desde modificar producto");
  Swal.fire({
    title: "¿Seguro qué desea modificar este producto?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento que quiero modificar dentro del array de productos
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === campoCodigo.value;
      });

      console.log(indiceProducto);
      //modificar los valores dentro del elemento del array de productos
      listaProductos[indiceProducto].producto = campoProducto.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].cantidad = campoCantidad.value;
      listaProductos[indiceProducto].url = campoUrl.value;

      //actualizar el localStorage
      guardarLocalStorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      //mostrar cartel al usuario
      Swal.fire(
        "Producto modificado!",
        "Su producto fue modificado correctamente",
        "success"
      );
      //limpiar el formulario
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

window.borrarProducto = function (codigo) {
  console.log("desde borrar producto");
  console.log(codigo);
  Swal.fire({
    title: "¿Seguro qué desea borrar este producto?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento en el array y borrarlo
      //opcion 1 encontrar el indice con findIndex y usar splice(indice,1);
      //opcion 2 usando filter
      let nuevaListaProducto = listaProductos.filter((itemProducto) => {
        return itemProducto.codigo !== codigo;
      });

      console.log(nuevaListaProducto);
      //actualizar el arreglo original y el localStorage
      listaProductos = nuevaListaProducto;
      guardarLocalStorage();

      //actualizar la tabla
      borrarTabla();
      cargaInicial();

      //mostrar cartel al usuario
      Swal.fire(
        "Producto eliminado!",
        "Su producto fue eliminado correctamente",
        "success"
      );
    }
  });
};


function cargarDatosPrueba(){
  const datos = [
    {
      codigo: "994",
      producto: "Kakashi Hatake (Anbu)",
      cantidad: "1",
      descripcion:
        "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
      url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
    },
    {
      codigo: "933",
      producto: "Shikamaru Nara",
      cantidad: "1",
      descripcion: "Naruto shippuden",
      url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
    },
    {
      codigo: "184",
      producto: "Tobi",
      cantidad: "1",
      descripcion:
        "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
      url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
    },
    {
      codigo: "729",
      producto: "Orochimaru",
      cantidad: "1",
      descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
      url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
    },
    {
      codigo: "073",
      producto: "Jiraiya On Toad",
      cantidad: "1",
      descripcion:
        "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
      url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
    },
    {
      codigo: "728",
      producto: "Gaara ",
      cantidad: "1",
      descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
      url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
    },
    {
      codigo: "182",
      producto: "Kakashi Figure",
      cantidad: "1",
      descripcion:
        'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
      url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
    },
  ];

 if (!localStorage.getItem('arrayProductoKey')) {
   // quiero agregar los datos de productos
   console.log('cargar datos prueba');
   localStorage.setItem('arrayProductoKey', JSON.stringify(datos));
   listaProductos = datos;
   //mostar en la tabla
   listaProductos.forEach(itemProducto => {
     crearFila(itemProducto);
   })
 }
};