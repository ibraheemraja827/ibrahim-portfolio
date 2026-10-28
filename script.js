
/* =========================================
   PORTFOLIO JAVASCRIPT
   Mobile Menu • Scroll Reveal • Current Year
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Current year in footer
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        };

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        // Close menu after selecting a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close menu when clicking outside it
        document.addEventListener("click", (event) => {
            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu when returning to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // 3. Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && revealElements.length) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px",
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // 4. Highlight the current page in the navbar
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

    if (navLinks) {
        navLinks.querySelectorAll("a").forEach((link) => {
            const linkUrl = new URL(link.href, window.location.href);
            const linkPage = linkUrl.pathname
                .split("/")
                .pop()
                .toLowerCase() || "index.html";

            if (
                linkPage === currentPage &&
                !link.hash
            ) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    // 5. Smooth scrolling for same-page section links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start",
                });
            }
        });
    });

    // 6. Add a class when JavaScript is running
    document.documentElement.classList.add("js-ready");

    console.log("Portfolio JavaScript loaded successfully.");
});
