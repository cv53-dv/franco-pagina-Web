const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

function setMenuState(open){

    navMenu.classList.toggle("active", open);

    menuToggle.classList.toggle("active", open);

    menuToggle.setAttribute("aria-expanded", String(open));

    menuToggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );

}

function closeMenu(){

    setMenuState(false);

}

menuToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    setMenuState(!navMenu.classList.contains("active"));

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape" && navMenu.classList.contains("active")){

        closeMenu();

        menuToggle.focus();

    }

});

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});

document.addEventListener("click", (e) => {

    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if(!clickedInsideMenu && !clickedToggle){

        closeMenu();

    }

});

const navbar = document.querySelector(".navbar-custom");

const setScrolled = () => navbar.classList.toggle("scrolled", window.scrollY > 40);

window.addEventListener("scroll", setScrolled, { passive: true });

setScrolled();

// Scroll-spy: marca en el menú la sección que está en pantalla.
const linkById = new Map(
    [...navLinks].map(link => [link.getAttribute("href").slice(1), link])
);

const spy = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(!entry.isIntersecting) return;

        navLinks.forEach(link => link.removeAttribute("aria-current"));

        const active = linkById.get(entry.target.id);

        if(active) active.setAttribute("aria-current", "true");

    });

}, {
    // Franja horizontal en el centro de la pantalla
    rootMargin: "-45% 0px -50% 0px"
});

document.querySelectorAll("main section[id]").forEach(section => spy.observe(section));

