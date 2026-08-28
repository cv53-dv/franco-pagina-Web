const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if(prefersReducedMotion){

    // Sin animación: mostrar todo el contenido de inmediato.
    revealElements.forEach(element => element.classList.add("active"));

}else{

    const observer = new IntersectionObserver((entries, obs)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

                obs.unobserve(entry.target);

            }

        });

    },{
        threshold:.15
    });

    revealElements.forEach(element=>{

        observer.observe(element);

    });

}