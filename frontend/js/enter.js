// Animación de entrada al navegar: cada vez que se toca un botón o enlace
// que lleva a una sección (menú, logo, "Ver proyectos", pie de página...),
// el contenido de esa sección entra en cascada al terminar el desplazamiento.
const enterReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Elementos que entran, en el orden en que aparecen en cada sección
const ENTER_ITEMS = [
    ".hero-title", ".hero-description", ".hero-buttons", ".hero-status", ".hero-proof",
    ".section-title", ".section-description",
    ".service-item", ".services-cta",
    ".stepper-step", ".stepper-panels", ".process-cta",
    ".slide-stage", ".project-body", ".carousel-controls",
    ".about-note", ".about-promises li", ".about-card",
    ".contact-form .field", ".contact-submit", ".contact-preview", ".contact-channels",
].join(",");

// Tope de la cascada: las secciones largas no esperan de más
const MAX_STEP = 10;

let pending = null;

let scrollObserver = null;

function hide(items){

    items.forEach((el, i) => {

        el.style.setProperty("--enter-i", String(Math.min(i, MAX_STEP)));

        el.classList.remove("enter-run");

        el.classList.add("enter-hide");

    });

}

function run(items){

    items.forEach((el) => {

        el.classList.remove("enter-hide");

        // Reinicia la animación aunque se haya ejecutado antes
        void el.offsetWidth;

        el.classList.add("enter-run");

    });

}

function enter(section){

    // Si había otra sección esperando (clic rápido en otro botón), se muestra ya
    if (pending) {

        pending.cancel();

        pending = null;

    }

    const items = [...section.querySelectorAll(ENTER_ITEMS)];

    if (!items.length) return;

    // Esta entrada manda: el scroll ya no los anima por su cuenta
    if (scrollObserver) items.forEach((el) => scrollObserver.unobserve(el));

    hide(items);

    let done = false;

    const start = () => {

        if (done) return;

        done = true;

        clearTimeout(fallback);

        window.removeEventListener("scrollend", start);

        pending = null;

        run(items);

    };

    // Arranca cuando termina el desplazamiento suave; si el navegador no
    // tiene "scrollend" o no hubo nada que desplazar, arranca igual.
    window.addEventListener("scrollend", start, { once: true });

    const fallback = setTimeout(start, 1100);

    pending = {
        cancel(){
            done = true;
            clearTimeout(fallback);
            window.removeEventListener("scrollend", start);
            items.forEach((el) => el.classList.remove("enter-hide"));
        },
    };

    // Ya estaba en posición: no habrá scroll, se anima enseguida
    requestAnimationFrame(() => {

        const top = section.getBoundingClientRect().top;

        const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;

        if (Math.abs(top - margin) < 4 || (section.id === "hero" && window.scrollY < 4)) start();

    });

}

if (!enterReducedMotion) {

    document.addEventListener("click", (e) => {

        const link = e.target.closest('a[href^="#"]');

        if (!link) return;

        const id = link.getAttribute("href").slice(1);

        const section = id && document.getElementById(id);

        if (section && section.matches("section")) enter(section);

    });

    // "Volver arriba" es un botón, no un enlace: también anima el inicio
    const toTop = document.getElementById("backToTop");

    const hero = document.getElementById("hero");

    if (toTop && hero) toTop.addEventListener("click", () => enter(hero));

    // Al hacer scroll: cada elemento de las secciones (menos el inicio, que
    // ya tiene su propia entrada) aparece al asomarse en pantalla. Los que
    // entran juntos lo hacen en cascada, en el orden de la página.
    // En el carrusel, las diapositivas de los costados nunca se asoman en
    // vertical: entra el carrusel entero en lugar de cada proyecto.
    const scrollItems = [...document.querySelectorAll("main section:not(#hero)")]
        .flatMap((section) => [...section.querySelectorAll(`${ENTER_ITEMS}, .carousel-track`)])
        .filter((el) => !el.parentElement.closest(".carousel-track"));

    scrollItems.forEach((el) => el.classList.add("enter-hide"));

    scrollObserver = new IntersectionObserver((entries, obs) => {

        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

        visible.forEach((el, i) => {

            obs.unobserve(el);

            el.style.setProperty("--enter-i", String(Math.min(i, MAX_STEP)));

        });

        run(visible);

    }, { rootMargin: "0px 0px -10% 0px" });

    scrollItems.forEach((el) => scrollObserver.observe(el));

    // Al terminar, se limpia la clase para que la próxima vez se pueda repetir
    document.addEventListener("animationend", (e) => {

        if (e.animationName === "enterUp") e.target.classList.remove("enter-run");

    });

}
