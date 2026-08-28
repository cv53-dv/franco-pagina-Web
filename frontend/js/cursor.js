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

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

});

function animateOutline(){

    outline.style.left = mouseX + "px";
    outline.style.top = mouseY + "px";

    requestAnimationFrame(animateOutline);


}

animateOutline();

const hoverItems = document.querySelectorAll(

    "button, a, .project-card, .about-card, .contact-card"

);

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        outline.classList.add("cursor-hover");

    });

    item.addEventListener("mouseleave", () => {

        outline.classList.remove("cursor-hover");

    });

});

}