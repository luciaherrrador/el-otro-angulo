

/* --- 2. FUNCIONES DE LÓGICA --- */

// Función para formatear la fecha de YYYY-MM-DD a "12 de enero de 2026"
function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
}

// Función que dibuja las tarjetas en el grid
function renderizarPronosticos() {
    const contenedor = document.getElementById('forecast-grid');
    const contenedorInicio = document.getElementById('recent-forecasts'); // Para la Landing
    
    // Si estamos en la página de PRONÓSTICOS (grid completo)
    if (contenedor) {
        contenedor.innerHTML = "";
        listaPronosticos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        listaPronosticos.forEach(item => {
            contenedor.innerHTML += crearCard(item);
        });
    }

    // Si estamos en la página de INICIO (solo mostrar los 3 últimos)
    if (contenedorInicio) {
        contenedorInicio.innerHTML = "";
        const ultimosTres = listaPronosticos
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 3);
            
        ultimosTres.forEach(item => {
            contenedorInicio.innerHTML += crearCard(item);
        });
    }
}

// Plantilla de la tarjeta para evitar repetir código
function crearCard(item) {
    return `
        <div class="forecast-card">
            <span class="date">${formatearFecha(item.fecha)}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <a href="pdf/${item.archivo}" class="btn-view" target="_blank">Consultar</a>
        </div>
    `;
} 

/* --- 3. INICIALIZACIÓN --- */
document.addEventListener('DOMContentLoaded', renderizarPronosticos);


// Lógica para el menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Opcional: animación de las rayitas (X)
        hamburger.classList.toggle('open');
    });
}

function renderizarNoticias() {
    const contenedor = document.querySelector('.news-list');
    if (!contenedor || typeof listaNoticias === 'undefined') return;

    contenedor.innerHTML = "";
    listaNoticias.forEach(noticia => {
        contenedor.innerHTML += `
            <a href="${noticia.enlace}" class="news-link" target="_blank">
                <article class="news-item">
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                    <div class="news-content">
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.resumen}</p>
                        <small>${noticia.fecha}</small>
                    </div>
                </article>
            </a>
        `;
    });
}

// Llama a la función dentro del DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderizarPronosticos();
    renderizarNoticias(); // Añade esta línea
});