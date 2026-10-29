// Servicios: cada fila abre y cierra su panel (patrón "disclosure").
// Se pueden tener varios abiertos a la vez para comparar.
function setOpen(toggle, open){

    const item = toggle.closest(".service-item");

    item.toggleAttribute("data-open", open);

    toggle.setAttribute("aria-expanded", String(open));

}

document.querySelectorAll(".service-toggle").forEach((toggle) => {

    toggle.addEventListener("click", () => {

        setOpen(toggle, toggle.getAttribute("aria-expanded") !== "true");

    });

});

// Enlaces a un servicio puntual (por ejemplo, desde el pie de página):
// abren su panel además de llevar hasta él
function openFromHash(hash){

    const target = hash && hash.startsWith("#svc-") && document.querySelector(hash);

    if (target && target.matches(".service-toggle")) setOpen(target, true);

}

document.addEventListener("click", (e) => {

    const link = e.target.closest('a[href^="#svc-"]');

    if (link) openFromHash(link.getAttribute("href"));

});

openFromHash(window.location.hash);
