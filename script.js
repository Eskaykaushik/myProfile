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
