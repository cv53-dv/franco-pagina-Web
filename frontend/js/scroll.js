document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.querySelector(".scroll-progress");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = progress + "%";

        const percentage =
            (scrollTop / docHeight) * 100;

        if(percentage > 65){

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});