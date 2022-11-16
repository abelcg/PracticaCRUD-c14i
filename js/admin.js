//traigo los elementos que necesito del html
let campoCodigo = document.getElementById('codigo');
console.log(campoCodigo);
let campoProducto = document.getElementById('producto');
let campoDescripcion = document.getElementById('descripcion');
let campoCantidad = document.getElementById('cantidad');
let campoUrl = document.getElementById('URL');

//asociar un evento a cada elemento obtenido

campoCodigo.addEventListener("blur", ()=>{
    console.log('desde codigo')
})