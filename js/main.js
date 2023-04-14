// Variables globales que se usan en las funciones.
let Carrito = [];
let Subtotal = 0;
let total = 0;
let cantProductos = 0;
let costoEnvio = 0;
let costoProducto = 0;
let codigoHTML = '';

//Captura de ID para Eventos y para agregado dinamico de elementos.
const contenedorProductos = document.getElementById('productos');
const contenedorCarrito = document.getElementById('productosCarrito');
const contenedorTotal = document.getElementById('total');
const contenedorCantProductos = document.getElementById('carrito-cantidad');
const contenedorLogin = document.getElementById('loginExitoso');
const boton = document.getElementById("botonLogin");
const contenedorUsuario = document.getElementById("usuario");
const nombreUsuario = document.getElementById("nombreUsuario");
const envioCosto = document.getElementById("envioSeleccion");
const mostrarCostoEnvio = document.getElementById("envio");
const botonEnvio = document.getElementById("botonEnvio");
const botonLimpiarCarrito = document.getElementById("botonLimpiarCarrito");
const finalizarCompra = document.getElementById("finalizarCompra");
const contenedorSubtotal = document.getElementById("Subtotal");

//Funciones que se ejecutan con la carga de la pagina.
window.addEventListener('load', leerJSON);
window.addEventListener('load', recuperarUsuario);

// Metodo que agrega un controlador de eventos al elemento.
boton.addEventListener("click", loginUsuario);
botonLimpiarCarrito.addEventListener("click", limpiarCarrito);
botonEnvio.addEventListener("click", calculoEnvio);
finalizarCompra.addEventListener("click", procesoFinalizarCompra);

class CarritoControlador{
    constructor(){
        this.productoDelCarrito = [];
    }
    agregar(productoAgregado){
        this.productoDelCarrito.push(productoAgregado);
    }
    limpiar(){
        this.productoDelCarrito = [];
        codigoHTML = '';
        costoProducto = 0;
        total = 0;
        cantProductos = 0;
        costoEnvio = 0;
        contenedorCarrito.innerHTML = codigoHTML;
        contenedorSubtotal.innerHTML = costoProducto;
        contenedorTotal.innerHTML = total;
        contenedorCantProductos.innerHTML = cantProductos;
        mostrarCostoEnvio.innerHTML = costoEnvio;
    }
}

let listaProductosCarrito = new CarritoControlador();

//Funcion asincronica con fetch para cargar los productos desde JSON, El metodo 
//recorre los datos de los productos y para cada uno de ellos los agrega en codigoHTML
// con el codigo HTML escrito agregando las variables imagen, nombre, precio de producto.
async function leerJSON() {
    const respuesta = await fetch('JSON/productos.json');
    const datos = await respuesta.json();
datos.forEach(producto => {
    codigoHTML += `
    <div class="p-2">
        <div class="card tarjeta">
            <img src="${producto.imagen}" class="card-img-top tarjetaImagen" alt="...">
            <div class="card-body">
                <p class="card-text">${producto.nombre}</p>
                <p><b>$${producto.precio}</b></p>
                <a href="#" class="btn btn-primary botonProductos" id="producto ${producto.id}">Agregar</a>
            </div>
        </div>
    </div>    
    `;
});

//Agrega el codigo generado y guardado en codigoHTML a contenedorProductos.
contenedorProductos.innerHTML = codigoHTML;

// FOS recorre el producto y agregar el controlador de eventos para hacer que 
// al hacer click, haga push del producto en el arreglo Carrito, luego borra los
// productos mostrados en contenedorCarrito para que no se superpongan y agrega
// el producto en cada click al contenedorCarrito. 
datos.forEach(producto => {
    const productoComprar = document.getElementById(`producto ${producto.id}`);
    productoComprar.addEventListener('click', () => {
        listaProductosCarrito.agregar(producto);
        contenedorCarrito.innerHTML = '';
        listaProductosCarrito.productoDelCarrito.forEach(producto => {
            contenedorCarrito.innerHTML += `
            <div class="card mb-3" style="max-width: 300px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${producto.imagen}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <p class="card-text">${producto.nombre}</p>
                        <p class="card-text"><b>$${producto.precio}</b></p>
                    </div>
                    </div>
                </div>
            </div>
        `;
        })
        mostrarCarrito();
        costoProducto = producto.precio;
        Subtotal += costoProducto;
        total += costoProducto;
        cantProductos ++;
        contenedorSubtotal.innerHTML = Subtotal;
        contenedorTotal.innerHTML = total;
        contenedorCantProductos.innerHTML = cantProductos;
        productoAgregado();
    });
});
}

// Función que usa Offcanvas para mostrar barra lateral que se usará de carrito.
function mostrarCarrito() {
    const myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'))
    myOffcanvas.show()
}

// Función para vaciar el carrito de compras.
function limpiarCarrito() {
    Swal.fire({
        title: 'Seguro que queres vaciar el Carrito?',
        showDenyButton: true,
        confirmButtonText: 'Vaciar',
        denyButtonText: `No`,
        customClass: {
            container: 'fontHelvetica',
            }
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({title:'Carrito vaciado!', text:'', icon:'sucess', customClass: {
                container: 'fontHelvetica',
                }})
            listaProductosCarrito.limpiar();
        } else if (result.isDenied) {
            Swal.fire({title:'Su Carrito no se vacio', text:'', icon:'info', customClass: {
                container: 'fontHelvetica',
                }})
        }
        })
}

// Función para simular el login exitoso de un usuario.
function loginUsuario() {
    contenedorLogin.innerHTML += `
    <div class="alert alert-success" role="alert">
    Login correcto!
    </div>
    `;
    contenedorUsuario.innerHTML = nombreUsuario.value
    guardarUsuario();
}

function calculoEnvio() {
    if (costoEnvio == "") {
        costoEnvio = parseInt(envioCosto.value);
    } else {
        total -= costoEnvio;
        costoEnvio = parseInt(envioCosto.value);
    }
    mostrarCostoEnvio.innerHTML = costoEnvio;
    total += costoEnvio;
    contenedorTotal.innerHTML = total;
}

// Función para guardar en localStorage el usuario ingresado.
function guardarUsuario(){
    localStorage.setItem("nombreUsuarioStorage", nombreUsuario.value)
}

// Función para recuperar de localStorage el usuario.
function recuperarUsuario(){
    contenedorUsuario.innerHTML = localStorage.getItem("nombreUsuarioStorage")
}

// Función para mostrar un cuadro de dialogo personalizado con libreria Toastify
// al agregar un produto al carrito.
function productoAgregado(){
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        className: "fontHelvetica",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

// Función para mostrar un cuadro de dialogo personalizado con libreria Toastify
// al agregar un produto al carrito.
function procesoFinalizarCompra(){
    Swal.fire({
        title: 'Terminar compra',
        text: "Se cobrara el monto indicado a tu tarjeta de credito!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar con la compra!',
        cancelButtonText: 'Cancelar',
        customClass: {
            container: 'fontHelvetica',
            }
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: 'Compra realizada!',
            text: 'Gracias por su compra.',
            icon: 'success',
            customClass:{
                container: 'fontHelvetica',
                }
            })
            listaProductosCarrito.limpiar();
        }
        })
}