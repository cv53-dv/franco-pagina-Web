const counters = document.querySelectorAll(".counter");

const counterReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const DURATION = 1400;

// ease-out exponencial: arranca rápido y se asienta suave en el valor final.
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

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

        render(counter, Math.round(easeOutExpo(t) * target));

        if (t < 1) requestAnimationFrame(tick);

    };

    requestAnimationFrame(tick);

}

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        animate(entry.target);

        counterObserver.unobserve(entry.target);

    });

},
{
    threshold: .6
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});
