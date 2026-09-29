const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

// El cursor personalizado solo tiene sentido con puntero fino (mouse/trackpad)
// y cuando el usuario no pidió reducir el movimiento.
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!dot || !outline || !finePointer || reducedMotion) {

    if (dot) dot.remove();
    if (outline) outline.remove();

} else {

let mouseX = -100;
let mouseY = -100;
let ringX = mouseX;
let ringY = mouseY;
let ringScale = 1;
let targetScale = 1;
let running = false;

// Se mueve con transform (compositor), nunca con left/top (layout).
function place(el, x, y, scale = 1){

    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;

}

// El anillo persigue al punto con amortiguación: se siente físico, no pegado.
function animateOutline(){

    ringX += (mouseX - ringX) * .2;
    ringY += (mouseY - ringY) * .2;
    ringScale += (targetScale - ringScale) * .2;

    place(outline, ringX, ringY, ringScale);

    const settled =
        Math.abs(mouseX - ringX) < .1 &&
        Math.abs(mouseY - ringY) < .1 &&
        Math.abs(targetScale - ringScale) < .005;

    // Sin movimiento no hay bucle: no gasta CPU con el mouse quieto.
    running = !settled;

    if (running) requestAnimationFrame(animateOutline);

}

function wake(){

    if (!running) {

        running = true;

        requestAnimationFrame(animateOutline);

    }

}

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    place(dot, mouseX, mouseY);

    document.documentElement.classList.add("has-cursor");

    wake();

}, { passive: true });

document.addEventListener("mouseleave", () => {

    document.documentElement.classList.remove("has-cursor");

});

// Delegación: cubre también elementos agregados más adelante.
const interactive = "a, button, .project-card, .contact-card";

document.addEventListener("mouseover", (e) => {

    const hit = e.target.closest(interactive);

    targetScale = hit ? 1.5 : 1;

    outline.classList.toggle("cursor-hover", Boolean(hit));

    wake();

});

}
