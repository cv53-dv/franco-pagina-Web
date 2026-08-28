const counters = document.querySelectorAll(".counter");

const counterReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        const prefix = counter.dataset.prefix || "";

        const suffix = counter.dataset.suffix || "";

        if (counterReducedMotion) {

            counter.textContent = prefix + target + suffix;

            counterObserver.unobserve(counter);

            return;

        }

        let current = 0;

        const increment = target / 60;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    prefix +
                    Math.floor(current) +
                    suffix;

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    prefix +
                    target +
                    suffix;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

},
{
    threshold: .6
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});