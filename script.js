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

        const isOpen = nav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

        // Cambiar icono hamburguesa ↔ X
        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (isOpen) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });


    // Cerrar menú cuando se toca una opción
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });


    // Cerrar menú al hacer click fuera
    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            nav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            nav.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            nav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}



/* =========================================================
   MODAL DE GALERÍA
========================================================= */

const galleryItems =
    document.querySelectorAll(".galeria-item");

const imageModal =
    document.getElementById("image-modal");

const modalImage =
    document.getElementById("modal-image");

const modalClose =
    document.getElementById("modal-close");


if (
    galleryItems.length > 0 &&
    imageModal &&
    modalImage
) {

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const imageSource =
                item.getAttribute("data-image");

            const image =
                item.querySelector("img");


            if (imageSource) {

                modalImage.src = imageSource;

            } else if (image) {

                modalImage.src = image.src;

            }


            if (image) {

                modalImage.alt =
                    image.alt;

            }


            imageModal.classList.add("active");

            imageModal.setAttribute(
                "aria-hidden",
                "false"
            );


            // Evitar que la página se desplace
            document.body.style.overflow = "hidden";

        });

    });

}



/* =========================================================
   CERRAR MODAL
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


    document.body.style.overflow = "";


    // Limpiar imagen después de la animación
    setTimeout(function () {

        if (
            !imageModal.classList.contains("active") &&
            modalImage
        ) {

            modalImage.src = "";

        }

    }, 300);

}



/* BOTÓN X */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeImageModal
    );

}



/* CLICK FUERA DE LA IMAGEN */

if (imageModal) {

    imageModal.addEventListener(
        "click",
        function (event) {

            if (event.target === imageModal) {

                closeImageModal();

            }

        }
    );

}



/* =========================================================
   CERRAR MODAL CON ESC
========================================================= */

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
   AÑO AUTOMÁTICO DEL FOOTER
========================================================= */

const currentYear =
    document.getElementById("current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   EVITAR QUE EL MODAL SE ABRA CON ENTER
   SI NO ESTÁ ENFOCADO CORRECTAMENTE
========================================================= */

if (galleryItems.length > 0) {

    galleryItems.forEach(function (item) {

        item.setAttribute(
            "aria-label",
            "Ampliar imagen"
        );

    });

}



/* =========================================================
   PROTECCIÓN AL CAMBIAR DE TAMAÑO
   Si pasamos de celular a PC mientras el menú
   está abierto, lo cerramos.
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

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        }

    }
);
