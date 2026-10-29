// Visor de capturas del portafolio: un <dialog> nativo
// (Esc para cerrar, foco atrapado y devuelto al botón por el navegador).
const lightbox = document.querySelector(".lightbox");

if (lightbox && typeof lightbox.showModal === "function") {

const image = lightbox.querySelector("img");
const caption = lightbox.querySelector("figcaption");

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {

    trigger.addEventListener("click", () => {

        image.src = trigger.dataset.lightbox;

        image.alt = `Captura ampliada: ${trigger.dataset.caption}`;

        caption.textContent = trigger.dataset.caption;

        lightbox.showModal();

    });

});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

// Clic fuera de la captura (sobre el fondo oscuro) también cierra
lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) lightbox.close();

});

}
