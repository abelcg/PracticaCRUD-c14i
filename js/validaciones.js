//validaciones
export const campoRequerido = (input) => {
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
  //comprobar que pasen cada una validaciones y si no pasan mostrar el alert
  // console.log('desde validar general');
  //console.log(e);
  let alerta = document.querySelector("#mjeAlerta");
  if (
    campoRequerido(campoCodigo) &&
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoUrl)
  ) {
    console.log("validación correcta los datos están listo para ser enviados");
    alerta.className = "alert alert-danger mt-4 d-none";
    return true;
  } else {
    console.log("validación incorrecta");
    alerta.className = "alert alert-danger mt-4";
    return false;
  }
};

//pueden usar un export general como el siguiente o anteponer la palabra export en cada defición de función a exportar
export { validarNumeros, validarURL, validarGeneral };
