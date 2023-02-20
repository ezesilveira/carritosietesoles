let envio = 0
let productos = 0
let total = 0
let usuario = ""

while (usuario == "") {
    usuario = prompt("Ingresar usuario");
    document.getElementById("usuario").innerHTML = usuario;
}

function elegirEnvio() {
    lugarEnvio = document.getElementById("envioSeleccion");
    if (lugarEnvio.value == "Otras"){
        alert("Por el momento no realizamos envios fuera de la ciudad");
    } else if(lugarEnvio.value == "RG") {
        envio = 600
        actualizaValores(productos, envio, total)

    } else if(lugarEnvio.value == "Local") {
        envio = 0
        actualizaValores(productos, envio, total);
    }
}

function sumarProductoA1() {
    let multiplicador = prompt("Ingrese la cantidad");
    let valor = document.getElementById("valorA1").textContent;
    productos = productos + (valor * multiplicador);
    actualizaValores(productos, envio, total);
}
function sumarProductoA2() {
    let multiplicador = prompt("Ingrese la cantidad");
    let valor = document.getElementById("valorA2").textContent;
    productos = productos + (valor * multiplicador);
    actualizaValores(productos, envio, total);
}
function sumarProductoA3() {
    let multiplicador = prompt("Ingrese la cantidad");
    let valor = document.getElementById("valorA3").textContent;
    productos = productos + (valor * multiplicador);
    actualizaValores(productos, envio, total);
}
function sumarProductoA4() {
    let multiplicador = prompt("Ingrese la cantidad");
    let valor = document.getElementById("valorA4").textContent;
    productos = productos + (valor * multiplicador);
    actualizaValores(productos, envio, total);
}

function actualizaValores (productos, envio, total) {
        document.getElementById("producto").innerHTML = productos;
        document.getElementById("envio").innerHTML = envio;
        total = productos + envio;
        document.getElementById("total").innerHTML = total;
}
function limpiarCarrito() {
    envio = 0
    productos = 0
    total = 0
    actualizaValores(productos, envio, total);
}