/* ==================================================
   MURGABANI 1 TO 100 CLUB
   GLOBAL WEBSITE SCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "MURGABANI 1 TO 100 CLUB — Website Loaded Successfully"
    );


    /* ==================================================
       1. BACK TO TOP BUTTON
    ================================================== */

    const topButton = document.querySelector(".top-btn");

    if (topButton) {

        // Hide initially
        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";
        topButton.style.transform = "translateY(15px)";
        topButton.style.transition = "all .3s ease";

        const updateTopButton = () => {

            if (window.scrollY > 400) {

                topButton.style.opacity = "1";
                topButton.style.visibility = "visible";
                topButton.style.transform = "translateY(0)";

            } else {

                topButton.style.opacity = "0";
                topButton.style.visibility = "hidden";
                topButton.style.transform = "translateY(15px)";

            }

        };

        window.addEventListener(
            "scroll",
            updateTopButton,
            { passive: true }
        );

        // Smooth scroll to top
        topButton.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ==================================================
       2. CURRENT YEAR
    ================================================== */

    const currentYear = document.querySelector(
        "#currentYear, .current-year"
    );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* ==================================================
       3. SMOOTH INTERNAL ANCHOR SCROLL
    ================================================== */

    document.querySelectorAll(
        'a[href^="#"]:not(.top-btn)'
    ).forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==================================================
       4. ACTIVE NAVIGATION
    ================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    document.querySelectorAll(
        ".main-nav a"
    ).forEach(link => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();

        if (
            linkPage === currentPage
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });


    /* ==================================================
       5. CLOSE # LINKS THAT DO NOTHING
    ================================================== */

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        // Top button is handled separately
        if (link.classList.contains("top-btn")) {
            return;
        }

        link.addEventListener("click", event => {
            event.preventDefault();
        });

    });


    /* ==================================================
       6. IMAGE ERROR HANDLING
    ================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                img.getAttribute("src")
            );

            img.classList.add("image-error");

        });

    });


    /* ==================================================
       7. EXTERNAL LINKS
    ================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* ==================================================
       8. LAZY LOAD NON-CRITICAL IMAGES
    ================================================== */

    document.querySelectorAll(
        "img"
    ).forEach((img, index) => {

        /*
         * Keep the first few important images
         * loading normally.
         *
         * Other images can load lazily.
         */
        if (index > 2) {

            img.setAttribute(
                "loading",
                "lazy"
            );

            img.setAttribute(
                "decoding",
                "async"
            );

        }

    });


    /* ==================================================
       9. PREVENT DOUBLE CLICK ON IMPORTANT BUTTONS
    ================================================== */

    document.querySelectorAll(
        ".primary-btn, .join-btn, .login-btn"
    ).forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 500);

        });

    });


    /* ==================================================
       10. PAGE LOADED
    ================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});