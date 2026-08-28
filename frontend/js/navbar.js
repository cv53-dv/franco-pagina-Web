const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

function closeMenu(){

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

}

menuToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");

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

