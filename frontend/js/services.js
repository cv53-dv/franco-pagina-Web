// Servicios: acordeón con un servicio abierto a la vez. Tocar el abierto lo
// cierra. Con el teclado: Enter/Espacio abren, flechas, Inicio y Fin
// recorren los servicios.
const serviceToggles = [...document.querySelectorAll(".service-toggle")];

const servicesReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Duración del despliegue en services.css (grid-template-rows 450ms)
const PANEL_MS = 450;

function setOpen(toggle, open){

    const item = toggle.closest(".service-item");

    item.toggleAttribute("data-open", open);

    toggle.setAttribute("aria-expanded", String(open));

}

// Si se cierra un panel que está arriba del elegido, la página sube mientras
// se pliega: se compensa el scroll cuadro a cuadro para que la fila tocada
// quede quieta bajo el dedo o el cursor.
function keepInPlace(toggle){

    const startTop = toggle.getBoundingClientRect().top;

    const end = performance.now() + PANEL_MS + 50;

    const follow = () => {

        const drift = toggle.getBoundingClientRect().top - startTop;

        if (Math.abs(drift) > .5) window.scrollBy({ top: drift, behavior: "instant" });

        if (performance.now() < end) requestAnimationFrame(follow);

    };

    if (servicesReducedMotion) requestAnimationFrame(follow);

    else follow();

}

function openOnly(toggle){

    const closesAbove = serviceToggles.some((other) =>
        other !== toggle
        && other.getAttribute("aria-expanded") === "true"
        && other.compareDocumentPosition(toggle) & Node.DOCUMENT_POSITION_FOLLOWING
    );

    serviceToggles.forEach((other) => setOpen(other, other === toggle));

    if (closesAbove) keepInPlace(toggle);

}

serviceToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {

        if (toggle.getAttribute("aria-expanded") === "true") setOpen(toggle, false);

        else openOnly(toggle);

    });

});

document.querySelector(".service-list")?.addEventListener("keydown", (e) => {

    const index = serviceToggles.indexOf(e.target);

    if (index < 0) return;

    const last = serviceToggles.length - 1;

    const next = {
        ArrowDown: index === last ? 0 : index + 1,
        ArrowUp: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
    }[e.key];

    if (next === undefined) return;

    e.preventDefault();

    serviceToggles[next].focus();

});

// Enlaces a un servicio puntual (por ejemplo, desde el pie de página):
// abren su panel además de llevar hasta él. El cambio es instantáneo para
// que el navegador calcule el destino con la lista ya acomodada; si no, el
// panel que se cierra arriba lo desplaza fuera de la pantalla.
function openFromHash(hash){

    const target = hash && hash.startsWith("#svc-") && document.querySelector(hash);

    if (!target || !target.matches(".service-toggle")) return;

    const list = target.closest(".service-list");

    list.setAttribute("data-instant", "");

    serviceToggles.forEach((other) => setOpen(other, other === target));

    void list.offsetHeight;

    requestAnimationFrame(() => list.removeAttribute("data-instant"));

}

document.addEventListener("click", (e) => {

    const link = e.target.closest('a[href^="#svc-"]');

    if (link) openFromHash(link.getAttribute("href"));

});

openFromHash(window.location.hash);
