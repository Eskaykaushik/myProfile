// =======================================
// TERMINAL INTRO
// =======================================

const command = "whoami";
const commandElement = document.getElementById("command");
const hero = document.querySelector(".hero-content");

let index = 0;

function typeCommand() {

    if (index < command.length) {

        commandElement.textContent += command.charAt(index);

        index++;

        setTimeout(typeCommand, 120);

    } else {

        setTimeout(() => {

            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";
            hero.style.transition = "700ms ease";

        }, 250);

    }

}

window.addEventListener("load", typeCommand);


// =======================================
// CURSOR GLOW
// =======================================

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {

    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;

});


// =======================================
// SCROLL REVEAL
// =======================================

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

},

{
    threshold: .15
}

);

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});
