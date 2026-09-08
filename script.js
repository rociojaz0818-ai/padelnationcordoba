/* =========================================================
   PADEL NATION CÓRDOBA
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const body = document.body;

const preloader = document.querySelector(".preloader");

const menuToggle = document.querySelector(".menu-toggle");

const mobileMenu = document.querySelector(".mobile-menu");

const mobileLinks = document.querySelectorAll(
    ".mobile-menu a"
);

const cursor = document.querySelector(".cursor");

const cursorFollower = document.querySelector(
    ".cursor-follower"
);

const cursorGlow = document.querySelector(
    ".cursor-glow"
);

const heroBall = document.querySelector(
    ".hero-ball"
);

const revealElements = document.querySelectorAll(
    ".reveal"
);


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hidden");

        body.classList.add("page-loaded");

    }, 1700);

});


/* =========================================================
   MENÚ MOBILE
========================================================= */

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );

}


/* =========================================================
   CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
========================================================= */

mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "open"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            body.classList.remove(
                "menu-open"
            );

        }
    );

});


/* =========================================================
   ESC PARA CERRAR MENÚ
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            mobileMenu?.classList.remove(
                "open"
            );

            menuToggle?.classList.remove(
                "active"
            );

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            body.classList.remove(
                "menu-open"
            );

        }

    }
);


/* =========================================================
   CURSOR PERSONALIZADO
========================================================= */

const isDesktop =
    window.matchMedia(
        "(min-width: 801px)"
    ).matches;


if (isDesktop && cursor && cursorFollower) {

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            /*
             * Cursor pequeño
             */

            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;


            /*
             * Glow
             */

            if (cursorGlow) {

                cursorGlow.style.left =
                    `${mouseX}px`;

                cursorGlow.style.top =
                    `${mouseY}px`;

            }

        },
        {
            passive: true
        }
    );


    /*
     * Cursor grande con retraso
     */

    function animateFollower() {

        followerX +=
            (mouseX - followerX) * 0.13;

        followerY +=
            (mouseY - followerY) * 0.13;


        cursorFollower.style.left =
            `${followerX}px`;

        cursorFollower.style.top =
            `${followerY}px`;


        requestAnimationFrame(
            animateFollower
        );

    }


    animateFollower();


    /*
     * Interacción con links y botones
     */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .court-card, .service-card, .gallery-item, .food-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorFollower.style.width =
                    "65px";

                cursorFollower.style.height =
                    "65px";

                cursorFollower.style.background =
                    "rgba(207,255,0,.08)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorFollower.style.width =
                    "35px";

                cursorFollower.style.height =
                    "35px";

                cursorFollower.style.background =
                    "transparent";

            }
        );

    });

}


/* =========================================================
   REVEAL AL HACER SCROLL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   PARALLAX DE LA PELOTA
========================================================= */

if (isDesktop && heroBall) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            targetX =
                (event.clientX /
                window.innerWidth - 0.5) * 24;

            targetY =
                (event.clientY /
                window.innerHeight - 0.5) * 24;

        },
        {
            passive: true
        }
    );


    function animateBall() {

        currentX +=
            (targetX - currentX) * 0.06;

        currentY +=
            (targetY - currentY) * 0.06;


        heroBall.style.marginLeft =
            `${currentX}px`;

        heroBall.style.marginTop =
            `${currentY}px`;


        requestAnimationFrame(
            animateBall
        );

    }


    animateBall();

}


/* =========================================================
   PARALLAX SUAVE DEL HERO
========================================================= */

const heroContent =
    document.querySelector(
        ".hero-content"
    );


if (isDesktop && heroContent) {

    window.addEventListener(
        "pointermove",
        event => {

            const x =
                (event.clientX /
                window.innerWidth - 0.5) * 8;

            const y =
                (event.clientY /
                window.innerHeight - 0.5) * 5;


            heroContent.style.transform =
                `translate(${x}px, ${y}px)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   EFECTO HOVER EN TARJETAS DE SERVICIOS
========================================================= */

const serviceCards =
    document.querySelectorAll(
        ".service-card"
    );


serviceCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - 0.5) * -5;

            const rotateY =
                ((x / rect.width) - 0.5) * 5;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   EFECTO HOVER EN CANCHAS
========================================================= */

const courtCards =
    document.querySelectorAll(
        ".court-card"
    );


courtCards.forEach(card => {

    const image =
        card.querySelector(
            ".court-image"
        );


    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const moveX =
                (x / rect.width - 0.5) * 10;

            const moveY =
                (y / rect.height - 0.5) * 10;


            if (image) {

                image.style.transform =
                    `scale(1.02)
                     translate(${moveX}px, ${moveY}px)`;

            }

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            if (image) {

                image.style.transform =
                    "";

            }

        }
    );

});


/* =========================================================
   GALERÍA — EFECTO MAGNÉTICO
========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryItems.forEach(item => {

    item.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                item.getBoundingClientRect();


            const x =
                (event.clientX -
                rect.left) /
                rect.width;


            const y =
                (event.clientY -
                rect.top) /
                rect.height;


            const moveX =
                (x - 0.5) * 12;

            const moveY =
                (y - 0.5) * 12;


            const placeholder =
                item.querySelector(
                    ".gallery-placeholder"
                );


            if (placeholder) {

                placeholder.style.transform =
                    `scale(1.04)
                     translate(${moveX}px, ${moveY}px)`;

            }

        }
    );


    item.addEventListener(
        "mouseleave",
        () => {

            const placeholder =
                item.querySelector(
                    ".gallery-placeholder"
                );


            if (placeholder) {

                placeholder.style.transform =
                    "";

            }

        }
    );

});


/* =========================================================
   BOTONES — EFECTO MAGNÉTICO
========================================================= */

const magneticButtons =
    document.querySelectorAll(
        ".btn, .header-book, .mobile-book"
    );


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 800
            ) return;


            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(
                    ${x * 0.08}px,
                    ${y * 0.08}px
                )`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});


/* =========================================================
   CAMBIO DE HEADER AL HACER SCROLL
========================================================= */

const header =
    document.querySelector(
        ".site-header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 60) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   LINK ACTIVO SEGÚN SECCIÓN
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(
    section => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   EVITAR PARALLAX EN MOBILE
========================================================= */

function checkScreenSize() {

    if (
        window.innerWidth <= 800
    ) {

        document.body.classList.add(
            "mobile-device"
        );

    } else {

        document.body.classList.remove(
            "mobile-device"
        );

    }

}


checkScreenSize();


window.addEventListener(
    "resize",
    checkScreenSize
);


/* =========================================================
   PREFERS REDUCED MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    reducedMotion.matches
) {

    document.documentElement.style
        .scrollBehavior = "auto";

}
/* =========================================
   PADEL BALLS ANIMATION
========================================= */

const padelBallsContainer = document.querySelector('.padel-balls');

if (padelBallsContainer) {

    const ballCount = window.innerWidth <= 800 ? 4 : 7;

    for (let i = 0; i < ballCount; i++) {

        const ball = document.createElement('span');
        ball.classList.add('padel-ball');

        const startY = Math.random() * 90 + 5;
        const duration = 7 + Math.random() * 7;
        const delay = Math.random() * -10;
        const size = 18 + Math.random() * 18;

        ball.style.width = `${size}px`;
        ball.style.height = `${size}px`;
        ball.style.top = `${startY}%`;

        padelBallsContainer.appendChild(ball);

        let startTime = null;

        function animateBall(timestamp) {

            if (!startTime) startTime = timestamp;

            const elapsed = (timestamp - startTime) / 1000;
            const progress = ((elapsed + Math.abs(delay)) % duration) / duration;

            const x = -80 + (window.innerWidth + 160) * progress;

            const wave =
                Math.sin(progress * Math.PI * 2 + i) *
                (25 + i * 5);

            const rotation = progress * 720;

            ball.style.transform =
                `translate3d(${x}px, ${wave}px, 0) rotate(${rotation}deg)`;

            requestAnimationFrame(animateBall);
        }

        requestAnimationFrame(animateBall);
    }
}
