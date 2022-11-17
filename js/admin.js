//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoUrl = document.getElementById("URL");
let formularioProducto = document.querySelector("#formProduto");

//validaciones
const campoRequerido = (input) => {
  console.log("desde campo requerido");
  console.log(input.value);
  if (input.value.trim().length > 0) {
    console.log("aqui esta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro un error");
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarNumeros = (input) => {
  //vamos a crear una expresión regular
  let patron = /^[0-9]{1,5}$/;
  //el metodo test --> devuelve true o false si matchea o no
  //regex.test(string a validar)
  if (patron.test(input.value)) {
    //cumpla con la expresion regular
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    //cumpla con la expresion regular
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarGeneral = (
  campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoUrl
) => {
    //prevenir el actualizar del submit

    //comprobar que pasen cada una validaciones y si no pasan mostrar el alert
};

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
