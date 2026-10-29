// Visor de proyectos del hero: pestañas accesibles (patrón ARIA tabs)
// con rotación automática que se detiene en cuanto el usuario elige uno.
const proof = document.querySelector("[data-proof]");

if (proof) {

const tabs = [...proof.querySelectorAll('[role="tab"]')];
const shots = [...proof.querySelectorAll(".browser-screen img")];
const panel = proof.querySelector('[role="tabpanel"]');
const url = proof.querySelector("[data-proof-url]");
const back = proof.querySelector("[data-proof-back]");

const INTERVAL = 5000;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let current = 0;
let timer = null;
let autoplay = !reduceMotion;
let hovering = false;
let visible = true;

proof.style.setProperty("--proof-interval", `${INTERVAL}ms`);

// Fundido corto para los elementos secundarios (texto de la URL, ventana de atrás)
function fadeIn(el){

    if (reduceMotion || !el.animate) return;

    el.animate(
        [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }],
        { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" }
    );

}

function select(index, dir = 1){

    const previous = current;

    current = (index + tabs.length) % tabs.length;

    if (current === previous && shots[current].classList.contains("is-active")) return;

    // Primero se fija la dirección y se fuerza un reflow, para que la captura
    // nueva arranque desde el lado correcto antes de empezar la transición.
    panel.style.setProperty("--dir", String(dir));
    void panel.offsetWidth;

    tabs.forEach((tab, i) => {

        const active = i === current;

        tab.setAttribute("aria-selected", String(active));

        tab.tabIndex = active ? 0 : -1;

        shots[i].classList.toggle("is-active", active);

        shots[i].classList.toggle("is-leaving", i === previous && !active);

        if (active) shots[i].removeAttribute("aria-hidden");
        else shots[i].setAttribute("aria-hidden", "true");

    });

    panel.setAttribute("aria-labelledby", tabs[current].id);

    url.textContent = tabs[current].dataset.url;

    fadeIn(url);

    // La ventana de atrás anticipa el proyecto siguiente
    back.src = shots[(current + 1) % shots.length].src;

    fadeIn(back);

}

// Dirección según la posición: avanzar entra por la derecha, retroceder por la izquierda
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

        select(current + 1);

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

select(0);

}
