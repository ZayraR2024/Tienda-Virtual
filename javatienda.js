// Variables globales
let contadorCarrito = 0;
const carritoSidebar = document.querySelector('.carrito-sidebar');
const carritoIcono = document.querySelector('.carrito');
const contadorElement = document.querySelector('.contador');
const listaCarrito = document.querySelector('.lista-carrito');
const totalCarritoElement = document.querySelector('.total-carrito');
const vaciarCarritoBtn = document.querySelector('.vaciar-carrito-btn');
let totalCarrito = 0;

// Función para actualizar el contador del carrito
function actualizarContador() {
    contadorElement.textContent = contadorCarrito;
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    totalCarritoElement.textContent = `Total: $${totalCarrito.toFixed(2)}`;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    contadorCarrito++;
    totalCarrito += precio;
    actualizarContador();
    actualizarTotalCarrito();
    
    // Crear el elemento de la lista
    const li = document.createElement('li');
    li.textContent = `${nombre} - $${precio.toFixed(2)}`;
    
    // Crear el botón de eliminar
    const eliminarBtn = document.createElement('span');
    eliminarBtn.textContent = 'x';
    eliminarBtn.classList.add('eliminar-producto-btn');
    eliminarBtn.addEventListener('click', () => eliminarDelCarrito(li, precio));
    
    li.appendChild(eliminarBtn);
    listaCarrito.appendChild(li);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(item, precio) {
    listaCarrito.removeChild(item);
    contadorCarrito--;
    totalCarrito -= precio;
    actualizarContador();
    actualizarTotalCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    listaCarrito.innerHTML = '';
    contadorCarrito = 0;
    totalCarrito = 0;
    actualizarContador();
    actualizarTotalCarrito();
}

// Event listener para el botón de vaciar carrito
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Event listener para el icono del carrito
carritoIcono.addEventListener('click', () => {
    carritoSidebar.classList.toggle('visible');
});

// Event listeners para los botones de comprar
document.querySelectorAll('.comprar-btn').forEach(button => {
    button.addEventListener('click', () => {
        const producto = button.closest('.producto');
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        agregarAlCarrito(nombre, precio);
    });
});

// Slider de imágenes
let slideIndex = 0;
const slides = document.querySelectorAll('.slider img');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.opacity = (index === slideIndex) ? '1' : '0';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000); // Cambia de imagen cada 3 segundos
}

showSlides();
