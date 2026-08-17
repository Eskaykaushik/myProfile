// ==========================================
// HERO TERMINAL ANIMATION
// ==========================================

const command = "whoami";
const commandElement = document.getElementById("command");
const nameLine = document.getElementById("nameLine");

if (commandElement && nameLine) {

    let index = 0;

    function typeCommand() {

        if (index < command.length) {

            commandElement.textContent += command.charAt(index);
            index++;

            setTimeout(typeCommand, 120);

        } else {

            const cursor = document.querySelector(".terminal .cursor");

            if (cursor) {
                cursor.style.display = "none";
            }

            setTimeout(() => {
                nameLine.classList.add("visible");
            }, 300);

        }

    }

    window.addEventListener("load", typeCommand);

}


// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const isLight = () => document.documentElement.classList.contains("light");

    themeToggle.setAttribute("aria-pressed", isLight() ? "true" : "false");

    themeToggle.addEventListener("click", () => {

        const light = !isLight();

        document.documentElement.classList.toggle("light", light);

        themeToggle.setAttribute("aria-pressed", light ? "true" : "false");

        localStorage.setItem("theme", light ? "light" : "dark");

    });

}


// ==========================================
// DOWNLOAD PDF
// ==========================================

const downloadBtn = document.getElementById("downloadResume");

if (downloadBtn) {

    downloadBtn.addEventListener("click", () => {

        window.print();

    });

}


// ==========================================
// CURSOR GLOW
// ==========================================

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    cursorGlow.style.transform = `translate(${x - 240}px, ${y - 240}px)`;

    window.addEventListener("mousemove", (event) => {

        cursorGlow.style.transform = `translate(${event.clientX - 240}px, ${event.clientY - 240}px)`;

    }, { passive: true });

}


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((el) => revealObserver.observe(el));

} else {

    revealElements.forEach((el) => el.classList.add("visible"));

}


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navList = document.querySelector("nav ul");

if (menuToggle && navList) {

    menuToggle.addEventListener("click", () => {
        const open = navList.classList.toggle("nav-open");
        menuToggle.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    navList.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("nav-open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navList.classList.contains("nav-open")) {
            navList.classList.remove("nav-open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

}
