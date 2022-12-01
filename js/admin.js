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
    'Producto creado!',
    'Su producto fue creado correctamente',
    'success'
  )
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
 if(listaProductos.length > 0){
  //crear filas
  //listaProductos.forEach((itemProducto) => {crearFila(itemProducto);});
  listaProductos.map((itemProducto) => {crearFila(itemProducto);});
 }
};


window.prepararEdicionProducto = function(codigo){
  console.log("desde editar");
  console.log(codigo);
  //buscar el producto en el array 
  let productoBuscado = listaProductos.find((itemProducto)=> {
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
}

function modificarProducto(){
  console.log('desde modificar producto');
  //encontrar la posicion del elemento que quiero modificar dentro del array de productos
  let indiceProducto = listaProductos.findIndex((itemProducto)=>{
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
    'Producto modificado!',
    'Su producto fue modificado correctamente',
    'success'
  )
  //limpiar el formulario
  limpiarFormulario();
};


function borrarTabla(){
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = '' 
}