// LISTA DE PRODUCTOS

const productos = [
    {
        id: 1,
        nombre: "Yerba mate",
        marca: "Don Mateo",
        precio: 3900,
        categoria: "Bebidas",
        imagen: "🧉"
    },
    {
        id: 2,
        nombre: "Leche larga vida",
        marca: "La Vaquita",
        precio: 1450,
        categoria: "Lácteos",
        imagen: "🥛"
    },
    {
        id: 3,
        nombre: "Fideos tirabuzón",
        marca: "La Abuela",
        precio: 1100,
        categoria: "Almacén",
        imagen: "🍝"
    },
    {
        id: 4,
        nombre: "Galletitas de chocolate",
        marca: "ChocoMax",
        precio: 1850,
        categoria: "Almacén",
        imagen: "🍪"
    },
    {
        id: 5,
        nombre: "Aceite de girasol",
        marca: "Sol del Campo",
        precio: 2600,
        categoria: "Almacén",
        imagen: "🫗"
    },
    {
        id: 6,
        nombre: "Queso cremoso",
        marca: "La Granja",
        precio: 4200,
        categoria: "Lácteos",
        imagen: "🧀"
    },
    {
        id: 7,
        nombre: "Agua mineral",
        marca: "Pura Vida",
        precio: 1250,
        categoria: "Bebidas",
        imagen: "💧"
    },
    {
        id: 8,
        nombre: "Gaseosa cola",
        marca: "Cola Pop",
        precio: 2800,
        categoria: "Bebidas",
        imagen: "🥤"
    },
    {
        id: 9,
        nombre: "Detergente limón",
        marca: "Brillo",
        precio: 1700,
        categoria: "Limpieza",
        imagen: "🧴"
    },
    {
        id: 10,
        nombre: "Lavandina",
        marca: "LimpiaMax",
        precio: 1300,
        categoria: "Limpieza",
        imagen: "🧼"
    }
];

// CARRITO

let carrito = [];

let categoriaSeleccionada = "Todos";

// FORMATO DE PRECIOS

function formatoPrecio(precio) {
    return "$ " + precio.toLocaleString("es-AR");
}

// MOSTRAR PRODUCTOS

function mostrarProductos(lista = productos) {
    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <img
                src="https://placehold.co/150x120/fff8e8/d9272e?text=${encodeURIComponent(producto.imagen)}"
                alt="${producto.nombre}"
            >

            <h3>${producto.marca} ${producto.nombre}</h3>

            <p>${producto.categoria}</p>

            <div class="precio">
                ${formatoPrecio(producto.precio)}
            </div>

            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar al carrito +
            </button>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// AGREGAR PRODUCTO AL CARRITO

function agregarAlCarrito(id) {

    const producto = productos.find(
        producto => producto.id === id
    );

    const productoEnCarrito = carrito.find(
        item => item.id === id
    );

    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();
}

// MOSTRAR CARRITO

function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");

    const contador = document.getElementById("contador");

    const subtotalHTML = document.getElementById("subtotal");

    const envioHTML = document.getElementById("envio");

    const totalHTML = document.getElementById("total");

    const botonComprar = document.getElementById("comprar");

    lista.innerHTML = "";

    let subtotal = 0;

    let cantidadTotal = 0;

    carrito.forEach(producto => {

        subtotal += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;

        const item = document.createElement("div");

        item.classList.add("item-carrito");

        item.innerHTML = `
            <h4>${producto.nombre}</h4>

            <p>
                ${formatoPrecio(producto.precio * producto.cantidad)}
            </p>

            <div class="cantidad">

                <button onclick="cambiarCantidad(${producto.id}, -1)">
                    -
                </button>

                <span>${producto.cantidad}</span>

                <button onclick="cambiarCantidad(${producto.id}, 1)">
                    +
                </button>

            </div>
        `;

        lista.appendChild(item);

    });

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="vacio">
                Tu carrito está vacío.
            </p>
        `;

    }

    // ENVÍO GRATIS A PARTIR DE $20.000

    let envio = 1200;

    if (subtotal >= 20000) {
        envio = 0;
    }

    const total = subtotal + envio;

    contador.textContent = cantidadTotal;

    subtotalHTML.textContent = formatoPrecio(subtotal);

    envioHTML.textContent = envio === 0
        ? "¡Gratis!"
        : formatoPrecio(envio);

    totalHTML.textContent = formatoPrecio(total);

    botonComprar.disabled = carrito.length === 0;

}

// CAMBIAR CANTIDAD

function cambiarCantidad(id, cantidad) {

    const producto = carrito.find(
        item => item.id === id
    );

    if (producto) {

        producto.cantidad += cantidad;

        if (producto.cantidad <= 0) {

            carrito = carrito.filter(
                item => item.id !== id
            );

        }

    }

    actualizarCarrito();
}

// VACIAR CARRITO

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

}

// FILTRAR POR CATEGORÍA

function filtrarCategoria(categoria) {

    categoriaSeleccionada = categoria;

    if (categoria === "Todos") {

        mostrarProductos(productos);

    } else {

        const productosFiltrados = productos.filter(
            producto => producto.categoria === categoria
        );

        mostrarProductos(productosFiltrados);

    }

}

// BUSCADOR

document.getElementById("buscador").addEventListener("input", function() {

    const texto = this.value.toLowerCase();

    let productosFiltrados = productos.filter(producto => {

        return producto.nombre.toLowerCase().includes(texto)
            || producto.marca.toLowerCase().includes(texto);

    });

    if (categoriaSeleccionada !== "Todos") {

        productosFiltrados = productosFiltrados.filter(
            producto => producto.categoria === categoriaSeleccionada
        );

    }

    mostrarProductos(productosFiltrados);

});

// MOSTRAR CARRITO

function mostrarCarrito() {

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });

}

// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrito.length === 0) {
        return;
    }

    alert(
        "¡Gracias por tu compra!\n\n" +
        "Este es un proyecto educativo. " +
        "El pedido no se envía realmente."
    );

}

// INICIAR PÁGINA

mostrarProductos();

actualizarCarrito();
