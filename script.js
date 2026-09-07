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

    const projectReveals = document.querySelectorAll("#projects .reveal");
    projectReveals.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });

} else {

    revealElements.forEach((el) => el.classList.add("visible"));

}

// ==========================================
// HERO SOCIALS STAGGERED ENTRANCE
// ==========================================

const heroSocials = document.querySelectorAll('#hero .socials a');

if (heroSocials.length) {
    heroSocials.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(12px)';
        link.style.transition = 'opacity 0.5s ease ' + (0.8 + i * 0.1) + 's, transform 0.5s ease ' + (0.8 + i * 0.1) + 's';
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            heroSocials.forEach(link => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            });
        }, 100);
    });
}
