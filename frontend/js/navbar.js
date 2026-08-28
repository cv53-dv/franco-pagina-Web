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

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

