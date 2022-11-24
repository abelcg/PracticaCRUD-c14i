export class Producto{
    constructor(parametrCodigo, parametroProducto, parametroDescripcion, parametroCantidad, parametroUrl){
        this.codigo = parametrCodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.cantidad = parametroCantidad;
        this.url = parametroUrl;
    }

    //getters y setters
     get mostrarCodigo() {
        return this.codigo;
     }

     get mostrarProducto() {
        return this.producto;
     }

     get mostrarDescripcion() {
        return this.descripcion;
     }

     get mostrarCantidad() {
        return this.cantidad;
     }

     get mostrarUrl() {
        return this.url;
     }

     set modificarCodigo(codigo) {
        this.codigo = codigo;
     }

     set modificarProducto(producto) {
        this.producto = producto;
     }

     set modificarDescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
     }
     
     set modificarCantidad(cantidad) {
        this.cantidad = cantidad;
     }
     set modificarUrl(url) {
        this.url = url;
     }
};