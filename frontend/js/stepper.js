// Etapas de "Cómo trabajamos": pestañas accesibles (patrón ARIA tabs).
// La línea se llena hasta la etapa elegida y el panel entra desde
// el lado hacia el que se avanza.
const stepper = document.querySelector("[data-stepper]");

if (stepper) {

const steps = [...stepper.querySelectorAll('[role="tab"]')];
const panels = [...stepper.querySelectorAll('[role="tabpanel"]')];

let current = 0;

function select(index, { focus = false } = {}){

    const target = (index + steps.length) % steps.length;

    if (target === current) return;

    const dir = target > current ? 1 : -1;

    current = target;

    steps.forEach((step, i) => {

        const active = i === current;

        step.setAttribute("aria-selected", String(active));

        step.tabIndex = active ? 0 : -1;

        step.classList.toggle("is-done", i < current);

        panels[i].hidden = !active;

        panels[i].classList.toggle("is-active", active);

    });

    panels[current].style.setProperty("--dir", String(dir));

    stepper.style.setProperty("--progress", String(current / (steps.length - 1)));

    if (focus) steps[current].focus();

}

steps.forEach((step, i) => step.addEventListener("click", () => select(i)));

stepper.querySelectorAll("[data-stepper-next]").forEach((button) => {

    button.addEventListener("click", () => select(current + 1, { focus: true }));

});

stepper.querySelector('[role="tablist"]').addEventListener("keydown", (e) => {

    const keys = {
        ArrowRight: current + 1,
        ArrowLeft: current - 1,
        Home: 0,
        End: steps.length - 1,
    };

    if (!(e.key in keys)) return;

    e.preventDefault();

    select(keys[e.key], { focus: true });

});

}
