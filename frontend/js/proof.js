// Visor de proyectos del hero: un mazo de tarjetas apiladas como fotos.
// Pestañas accesibles (patrón ARIA tabs) con rotación automática que se
// detiene en cuanto el usuario elige un proyecto.
const proof = document.querySelector("[data-proof]");

if (proof) {

const tabs = [...proof.querySelectorAll('[role="tab"]')];
const cards = [...proof.querySelectorAll(".proof-card")];
const stack = proof.querySelector('[role="tabpanel"]');

const INTERVAL = 5000;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let current = 0;
let timer = null;
let autoplay = !reduceMotion;
let hovering = false;
let visible = true;

proof.style.setProperty("--proof-interval", `${INTERVAL}ms`);

// Posición de cada tarjeta en el mazo: 0 = arriba de todo
const posOf = (card, top) => (card - top + cards.length) % cards.length;

function select(index, dir = 1){

    const target = (index + cards.length) % cards.length;

    if (target === current) return;

    cards.forEach((card, i) => {

        const from = posOf(i, current);
        const to = posOf(i, target);

        card.classList.remove("is-to-back", "is-to-top");

        if (!reduceMotion) {

            // Al avanzar, las tarjetas que van al fondo salen volando por la derecha;
            // al retroceder, la que sube desde el fondo entra volando por la izquierda.
            // El resto solo se reacomoda con la transición normal.
            if (dir > 0 && to > from) {

                void card.offsetWidth;
                card.classList.add("is-to-back");

            } else if (dir < 0 && to < from) {

                void card.offsetWidth;
                card.classList.add("is-to-top");

            }

        }

        card.dataset.pos = String(to);

        if (to === 0) card.removeAttribute("aria-hidden");
        else card.setAttribute("aria-hidden", "true");

    });

    current = target;

    tabs.forEach((tab, i) => {

        const active = i === current;

        tab.setAttribute("aria-selected", String(active));

        tab.tabIndex = active ? 0 : -1;

    });

    stack.setAttribute("aria-labelledby", tabs[current].id);

}

cards.forEach((card) => {

    card.addEventListener("animationend", () => {

        card.classList.remove("is-to-back", "is-to-top");

    });

});

// Dirección según la posición: avanzar va hacia la derecha, retroceder hacia la izquierda
const dirTo = (index) => (index < current ? -1 : 1);

function stop(){

    clearInterval(timer);

    timer = null;

    proof.classList.add("is-paused");

}

function start(){

    if (!autoplay || hovering || !visible || document.hidden || timer) return;

    proof.classList.remove("is-paused");

    // Reinicia la barra de progreso de la pestaña activa
    proof.classList.add("is-restarting");
    void proof.offsetWidth;
    proof.classList.remove("is-restarting");

    timer = setInterval(() => {

        select(current + 1, 1);

    }, INTERVAL);

}

// Elegir un proyecto apaga la rotación: el usuario ya tomó el control
function takeControl(){

    autoplay = false;

    stop();

    proof.classList.add("is-manual");

}

tabs.forEach((tab, i) => {

    tab.addEventListener("click", () => {

        takeControl();

        select(i, dirTo(i));

    });

});

// Tocar la tarjeta de arriba también pasa a la siguiente, como hojear fotos
stack.addEventListener("click", () => {

    takeControl();

    select(current + 1, 1);

});

proof.querySelector('[role="tablist"]').addEventListener("keydown", (e) => {

    const keys = {
        ArrowRight: current + 1,
        ArrowLeft: current - 1,
        Home: 0,
        End: tabs.length - 1,
    };

    if (!(e.key in keys)) return;

    e.preventDefault();

    takeControl();

    const dir = e.key === "ArrowLeft" || e.key === "Home" ? -1 : 1;

    select(keys[e.key], dir);

    tabs[current].focus();

});

proof.addEventListener("mouseenter", () => { hovering = true; stop(); });

proof.addEventListener("mouseleave", () => { hovering = false; start(); });

proof.addEventListener("focusin", stop);

proof.addEventListener("focusout", (e) => {

    if (!proof.contains(e.relatedTarget)) start();

});

document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

// Fuera de pantalla no rota (no gasta CPU ni cambia sin que nadie lo vea)
new IntersectionObserver(([entry]) => {

    visible = entry.isIntersecting;

    visible ? start() : stop();

}).observe(proof);

if (reduceMotion) proof.classList.add("is-manual");

}
