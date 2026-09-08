/* =========================================================
   PÁDEL NATION CÓRDOBA
   SCRIPT.JS
========================================================= */


/* =========================================================
   MENÚ MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");


if (menuToggle && nav) {

    // Abrir / cerrar menú

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("active")) {

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }

            menuToggle.setAttribute(
                "aria-label",
                "Cerrar menú"
            );

        } else {

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        }

    });


    // Cerrar al seleccionar una sección

    const navLinks = nav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        });

    });


    // Cerrar al hacer click fuera

    document.addEventListener("click", function (event) {

        const clickDentroDelMenu =
            nav.contains(event.target);

        const clickEnBoton =
            menuToggle.contains(event.target);


        if (
            nav.classList.contains("active") &&
            !clickDentroDelMenu &&
            !clickEnBoton
        ) {

            nav.classList.remove("active");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        }

    });

}


/* =========================================================
   GALERÍA
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const modal =
    document.getElementById("modal");

const modalImage =
    document.getElementById("modal-image");

const modalClose =
    document.getElementById("modal-close");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const imageSource =
            item.getAttribute("data-image");

        const image =
            item.querySelector("img");


        if (!modal || !modalImage || !imageSource) {
            return;
        }


        modalImage.src = imageSource;


        if (image) {
            modalImage.alt = image.alt;
        }


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        // Evitar scroll mientras la imagen está abierta

        document.body.style.overflow = "hidden";

    });

});


/* =========================================================
   CERRAR GALERÍA
========================================================= */

function closeModal() {

    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";


    // Limpiar imagen después de cerrar

    setTimeout(function () {

        if (
            modalImage &&
            !modal.classList.contains("active")
        ) {

            modalImage.src = "";

        }

    }, 300);

}


/* =========================================================
   BOTÓN X
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


/* =========================================================
   CERRAR HACIENDO CLICK FUERA
========================================================= */

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                closeModal();
            }

        }
    );

}


/* =========================================================
   CERRAR CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CERRAR MENÚ AL CAMBIAR A PC
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
