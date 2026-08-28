// Año actual en el pie de página.
const yearEl = document.getElementById("year");

if (yearEl) {

    yearEl.textContent = new Date().getFullYear();

}
