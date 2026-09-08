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

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("active")) {

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }

        } else {

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    const navLinks = nav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    document.addEventListener("click", function (event) {

        const clickedInsideNav =
            nav.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);


        if (
            nav.classList.contains("active") &&
            !clickedInsideNav &&
            !clickedButton
        ) {

            nav.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

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

        const image =
            item.getAttribute("data-image");

        const originalImage =
            item.querySelector("img");


        if (!image || !modal || !modalImage) {
            return;
        }


        modalImage.src = image;


        if (originalImage) {
            modalImage.alt = originalImage.alt;
        }


        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* =========================================================
   CERRAR MODAL
========================================================= */

function closeModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeModal();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
    ) {

        closeModal();

    }

});


/* =========================================================
   AÑO
========================================================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}
