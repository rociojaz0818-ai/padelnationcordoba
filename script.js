/* =========================================================
   PÁDEL NATION CÓRDOBA
   SCRIPT.JS
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

// PRELOADER
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add("hidden");
        }

        document.body.classList.remove("preloader-active");
    }, 1800);
});

// Seguro adicional: evita que quede trabado
setTimeout(() => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        preloader.classList.add("hidden");
    }

    document.body.classList.remove("preloader-active");
}, 4000);



/* =========================================================
   MENÚ MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");


if (menuToggle && nav) {


    /* -----------------------------------------
       ABRIR / CERRAR MENÚ
    ----------------------------------------- */

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("active");


        const menuOpen =
            nav.classList.contains("active");


        menuToggle.setAttribute(
            "aria-label",
            menuOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );


        // Cambiar hamburguesa por X

        const icon =
            menuToggle.querySelector("i");


        if (icon) {

            if (menuOpen) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    });



    /* -----------------------------------------
       CERRAR AL TOCAR UNA OPCIÓN
    ----------------------------------------- */

    const navLinks =
        nav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");


            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    });



    /* -----------------------------------------
       CERRAR AL TOCAR AFUERA
    ----------------------------------------- */

    document.addEventListener(
        "click",
        function (event) {

            const clickedMenu =
                nav.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);


            if (
                nav.classList.contains("active") &&
                !clickedMenu &&
                !clickedButton
            ) {

                nav.classList.remove("active");


                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        }
    );

}



/* =========================================================
   GALERÍA
========================================================= */

const galleryItems =
    document.querySelectorAll(".galeria-item");


const imageModal =
    document.getElementById("image-modal");


const modalImage =
    document.getElementById("modal-image");


const modalClose =
    document.getElementById("modal-close");



/* -----------------------------------------
   ABRIR IMAGEN
----------------------------------------- */

if (
    galleryItems.length > 0 &&
    imageModal &&
    modalImage
) {


    galleryItems.forEach(function (item) {


        item.addEventListener(
            "click",
            function () {


                const imageSource =
                    item.getAttribute("data-image");


                const originalImage =
                    item.querySelector("img");


                if (imageSource) {

                    modalImage.src =
                        imageSource;

                } else if (originalImage) {

                    modalImage.src =
                        originalImage.src;

                }


                if (originalImage) {

                    modalImage.alt =
                        originalImage.alt;

                }


                imageModal.classList.add("active");


                imageModal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                // Bloquear scroll

                document.body.style.overflow =
                    "hidden";

            }
        );


    });


}



/* =========================================================
   CERRAR GALERÍA
========================================================= */

function closeImageModal() {


    if (!imageModal) {
        return;
    }


    imageModal.classList.remove("active");


    imageModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    // Limpiar imagen

    setTimeout(function () {

        if (
            !imageModal.classList.contains("active") &&
            modalImage
        ) {

            modalImage.src = "";

        }

    }, 300);

}



/* -----------------------------------------
   BOTÓN X
----------------------------------------- */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeImageModal
    );

}



/* -----------------------------------------
   CLICK FUERA DE LA FOTO
----------------------------------------- */

if (imageModal) {

    imageModal.addEventListener(
        "click",
        function (event) {


            if (
                event.target === imageModal
            ) {

                closeImageModal();

            }


        }
    );

}



/* -----------------------------------------
   ESC PARA CERRAR
----------------------------------------- */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key === "Escape" &&
            imageModal &&
            imageModal.classList.contains("active")
        ) {

            closeImageModal();

        }


    }
);



/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

const currentYear =
    document.getElementById("current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   CERRAR MENÚ SI CAMBIAMOS A PC
========================================================= */

window.addEventListener(
    "resize",
    function () {


        if (
            window.innerWidth > 768 &&
            nav &&
            nav.classList.contains("active")
        ) {


            nav.classList.remove("active");


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }


    }
);
