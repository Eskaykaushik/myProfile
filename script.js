const command = "whoami";
const commandElement = document.getElementById("command");
const nameLine = document.getElementById("nameLine");
let index = 0;

function typeCommand() {
    if (index < command.length) {
        // Append next character
        commandElement.textContent += command.charAt(index);
        index++;
        // Adjust typing speed here (120ms looks natural)
        setTimeout(typeCommand, 120);
    } else {
        // Stop cursor from blinking on the input line once done
        const cursor = document.querySelector(".terminal .cursor");
        if (cursor) cursor.style.display = "none";

        // Reveal the terminal output name line
        setTimeout(() => {
            nameLine.classList.add("visible");
        }, 300);
    }
}

// Start the terminal simulation on page load
window.addEventListener("load", typeCommand);
