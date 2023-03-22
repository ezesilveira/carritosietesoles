let Carrito = [];
let total = 0;
let cantProductos = 0;
let costoEnvio = 0;
let costoProducto = 0;

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

window.addEventListener('load', leerJSON);
window.addEventListener('load', recuperarUsuario);

async function leerJSON() {
    const respuesta = await fetch('JSON/productos.json');
    const datos = await respuesta.json();

let codigoHTML = '';

datos.forEach(producto => {
    codigoHTML += `
    <div class="p-2">
        <div class="card">
            <img src="${producto.imagen}" class="card-img-top tarjetaImagen" alt="...">
            <div class="card-body">
                <p class="card-text">${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <a href="#" class="btn btn-primary botonProductos" id="producto ${producto.id}">Agregar</a>
            </div>
        </div>
    </div>    
    `;
});

contenedorProductos.innerHTML = codigoHTML;

datos.forEach(producto => {
    const productoComprar = document.getElementById(`producto ${producto.id}`);
    productoComprar.addEventListener('click', () => {
        Carrito.push(producto);
        contenedorCarrito.innerHTML = '';
        Carrito.forEach(producto => {
            contenedorCarrito.innerHTML += `
            <li class="list-group-item">${producto.nombre} $
            <span class="badge bg-primary rounded-pill">${producto.precio}</span>
            </li>
        `;
        })
        mostrarCarrito();
        costoProducto = producto.precio;
        total = total + costoProducto
        cantProductos ++;
        contenedorTotal.innerHTML = total;
        contenedorCantProductos.innerHTML = cantProductos;
        productoAgregado();
    });
});
}

function mostrarCarrito() {
    const myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'))
    myOffcanvas.show()
}

botonLimpiarCarrito.addEventListener("click", limpiarCarrito);
function limpiarCarrito() {
    Carrito = [];
    codigoHTML = '';
    total = 0;
    cantProductos = 0;
    costoEnvio = 0;
    contenedorCarrito.innerHTML = codigoHTML;
    contenedorTotal.innerHTML = total;
    contenedorCantProductos.innerHTML = cantProductos;
    mostrarCostoEnvio.innerHTML = costoEnvio
}

boton.addEventListener("click", loginUsuario);
function loginUsuario() {
    contenedorLogin.innerHTML += `
    <div class="alert alert-success" role="alert">
    Login correcto!
    </div>
    `;
    contenedorUsuario.innerHTML = nombreUsuario.value
    guardarUsuario();
}

botonEnvio.addEventListener("click", calculoEnvio);
function calculoEnvio() {
    if (costoEnvio == "") {   // Ver si se puede pasar a operador ternario
        costoEnvio = parseInt(envioCosto.value);
    } else {
        total = total - costoEnvio;
        costoEnvio = parseInt(envioCosto.value);
    }
    mostrarCostoEnvio.innerHTML = costoEnvio
    total = total + costoEnvio
    contenedorTotal.innerHTML = total;
}

function guardarUsuario(){
    localStorage.setItem("nombreUsuarioStorage", nombreUsuario.value)
}

function recuperarUsuario(){
    contenedorUsuario.innerHTML = localStorage.getItem("nombreUsuarioStorage")
}

function productoAgregado(){
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

finalizarCompra.addEventListener("click", procesoFinalizarCompra);

function procesoFinalizarCompra(){
    Swal.fire({
        title: 'Terminar compra',
        text: "Se cobrara el monto indicado a tu tarjeta de credito!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar con la compra!'
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Compra realizada!',
            'Gracias por su compra.',
            'success'
            )
        }
        })
    limpiarCarrito();
}