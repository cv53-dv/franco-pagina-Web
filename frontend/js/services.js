// Servicios: cada fila abre y cierra su panel (patrón "disclosure").
// Se pueden tener varios abiertos a la vez para comparar.
document.querySelectorAll(".service-toggle").forEach((toggle) => {

    const item = toggle.closest(".service-item");

    toggle.addEventListener("click", () => {

        const open = !item.hasAttribute("data-open");

        item.toggleAttribute("data-open", open);

        toggle.setAttribute("aria-expanded", String(open));

    });

});
