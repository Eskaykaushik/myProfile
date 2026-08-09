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
// RESUME THEME TOGGLE
// ==========================================

const resumeTheme = document.getElementById("resumeTheme");

if (resumeTheme) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");
        resumeTheme.textContent = "Dark Mode";

    }

    resumeTheme.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");

        resumeTheme.textContent = isLight ? "Dark Mode" : "Light Mode";

        localStorage.setItem("theme", isLight ? "light" : "dark");

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
