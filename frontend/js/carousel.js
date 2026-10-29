// Carrusel del portafolio. El desplazamiento es el scroll nativo con
// scroll-snap (dedo y trackpad funcionan solos); acá se agrega el arrastre
// con mouse, las flechas, el contador y la inclinación 3D de las capturas.
const carousel = document.querySelector("[data-carousel]");

if (carousel) {

const track = carousel.querySelector(".carousel-track");
const slides = [...track.querySelectorAll(".slide")];
const prev = carousel.querySelector("[data-carousel-prev]");
const next = carousel.querySelector("[data-carousel-next]");
const label = carousel.querySelector("[data-carousel-current]");
const bar = carousel.querySelector("[data-carousel-bar]");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let current = -1;

const padStart = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;

// Distancia entre el inicio de una diapositiva y el punto de encaje del carrusel
const offsetOf = (slide) =>
    slide.getBoundingClientRect().left - track.getBoundingClientRect().left - padStart();

function nearest(){

    // Al final del recorrido la última no llega al punto de encaje: se la da por actual
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return slides.length - 1;

    let best = 0;

    slides.forEach((slide, i) => {

        if (Math.abs(offsetOf(slide)) < Math.abs(offsetOf(slides[best]))) best = i;

    });

    return best;

}

function update(){

    const index = nearest();

    if (index === current) return;

    current = index;

    slides.forEach((slide, i) => slide.classList.toggle("is-current", i === current));

    label.textContent = String(current + 1);

    bar.style.transform = `scaleX(${(current + 1) / slides.length})`;

    prev.disabled = current === 0;

    next.disabled = current === slides.length - 1;

}

function goTo(index){

    const target = slides[Math.max(0, Math.min(index, slides.length - 1))];

    track.scrollTo({
        left: track.scrollLeft + offsetOf(target),
        behavior: reduceMotion ? "auto" : "smooth",
    });

}

let ticking = false;

track.addEventListener("scroll", () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => { update(); ticking = false; });

}, { passive: true });

prev.addEventListener("click", () => goTo(current - 1));

next.addEventListener("click", () => goTo(current + 1));

/*
 * Arrastre con mouse (en táctil ya lo hace el navegador)
 */
let dragStartX = 0;
let dragStartScroll = 0;
let dragStartIndex = 0;
let pointerDown = false;
let dragged = false;

track.addEventListener("pointerdown", (e) => {

    if (e.pointerType !== "mouse" || e.button !== 0) return;

    pointerDown = true;

    dragged = false;

    dragStartX = e.clientX;

    dragStartScroll = track.scrollLeft;

    dragStartIndex = current;

});

window.addEventListener("pointermove", (e) => {

    if (!pointerDown) return;

    const dx = e.clientX - dragStartX;

    if (!dragged && Math.abs(dx) > 6) {

        dragged = true;

        track.classList.add("is-dragging");

    }

    if (dragged) track.scrollLeft = dragStartScroll - dx;

});

window.addEventListener("pointerup", (e) => {

    if (!pointerDown) return;

    pointerDown = false;

    if (!dragged) return;

    track.classList.remove("is-dragging");

    // Un arrastre corto pero decidido también cambia de proyecto
    const dx = e.clientX - dragStartX;

    let target = nearest();

    if (target === dragStartIndex && Math.abs(dx) > 60) target += dx < 0 ? 1 : -1;

    goTo(target);

});

// Si hubo arrastre, el clic que lo termina no debe abrir la captura ni el enlace
track.addEventListener("click", (e) => {

    if (!dragged) return;

    e.preventDefault();

    e.stopPropagation();

    dragged = false;

}, true);

track.addEventListener("dragstart", (e) => e.preventDefault());

/*
 * Inclinación 3D de la captura siguiendo al mouse
 */
if (finePointer && !reduceMotion) {

    track.querySelectorAll(".project-shot").forEach((shot) => {

        shot.addEventListener("pointermove", (e) => {

            if (pointerDown) return;

            const r = shot.getBoundingClientRect();

            const x = (e.clientX - r.left) / r.width - .5;

            const y = (e.clientY - r.top) / r.height - .5;

            shot.classList.add("is-tilting");

            shot.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);

            shot.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);

        });

        shot.addEventListener("pointerleave", () => {

            shot.classList.remove("is-tilting");

            shot.style.setProperty("--ry", "0deg");

            shot.style.setProperty("--rx", "0deg");

        });

    });

}

/*
 * Entrada escalonada: una sola vez, cuando la sección aparece
 */
function reveal(){

    carousel.classList.add("is-in");

    // Pasada la entrada, sin retrasos: el cambio de diapositiva responde al instante
    setTimeout(() => carousel.classList.add("is-ready"), 1000);

}

if (reduceMotion) {

    carousel.classList.add("is-in", "is-ready");

} else {

    const io = new IntersectionObserver(([entry]) => {

        if (!entry.isIntersecting) return;

        reveal();

        io.disconnect();

    }, { threshold: .2 });

    io.observe(carousel);

}

update();

}
