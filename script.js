const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});
