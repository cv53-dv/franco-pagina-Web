const counters = document.querySelectorAll(".counter");

const counterReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const DURATION = 1200;

// ease-out cúbico: sube rápido y frena suave en el valor final, sin
// quemar casi todo el conteo en los primeros cuadros.
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Si el contador está dentro de un bloque que entra con animación al hacer
// scroll (js/enter.js), espera a que ese bloque empiece a verse.
function whenVisible(counter, callback){

    const host = counter.closest(".enter-hide, .enter-run");

    const check = () => {

        if (!host || (!host.classList.contains("enter-hide") && Number(getComputedStyle(host).opacity) > .1)) {

            callback();

            return;

        }

        requestAnimationFrame(check);

    };

    check();

}

function render(counter, value){

    const prefix = counter.dataset.prefix || "";

    const suffix = counter.dataset.suffix || "";

    counter.textContent = prefix + value + suffix;

}

function animate(counter){

    const target = Number(counter.dataset.target);

    if (counterReducedMotion) {

        render(counter, target);

        return;

    }

    const start = performance.now();

    const tick = (now) => {

        const t = Math.min((now - start) / DURATION, 1);

        render(counter, Math.round(easeOutCubic(t) * target));

        if (t < 1) requestAnimationFrame(tick);

    };

    requestAnimationFrame(tick);

}

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        whenVisible(entry.target, () => animate(entry.target));

        counterObserver.unobserve(entry.target);

    });

},
{
    threshold: .6
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});
