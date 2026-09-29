const progressBar = document.querySelector(".scroll-progress");
const backToTop = document.getElementById("backToTop");

let ticking = false;

// Un solo cálculo por frame, aunque el evento scroll se dispare más seguido.
function update(){

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = docHeight > 0 ? window.scrollY / docHeight : 0;

    if(progressBar){

        progressBar.style.transform = `scaleX(${progress})`;

    }

    if(backToTop){

        backToTop.classList.toggle("show", progress > .35);

    }

    ticking = false;

}

window.addEventListener("scroll", () => {

    if(!ticking){

        ticking = true;

        requestAnimationFrame(update);

    }

}, { passive: true });

update();

if(backToTop){

    backToTop.addEventListener("click", () => {

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

    });

}
