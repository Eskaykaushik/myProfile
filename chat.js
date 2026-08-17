/* ==========================================
   Persona chat widget — k-kaushik
   Calls the /api/agent endpoint on Kaushix API
========================================== */

(function () {

    const API_URL = "https://kaushix-api-service.onrender.com";
    const ENDPOINT = "/api/agent";

    const launcher = document.getElementById("chat-launcher");
    const panel = document.getElementById("chat-panel");
    const closeBtn = document.getElementById("chat-close");
    const body = document.getElementById("chat-body");
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");

    const AUTHOR_LABEL = "shubham";

    const WELCOME = "Hey — I'm Shubham. Ask me about my work, my projects, Kaushix Labs, or anything you'd like to build together.";

    const SUGGESTIONS = [
        "What projects have you built?",
        "Tell me about Kaushix Labs",
        "What are you working on right now?",
        "How can we collaborate?"
    ];

    let firstOpen = true;


    /* ==========================================
       Helpers
    ========================================== */

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    function addMessage(author, text, type) {
        const wrap = document.createElement("div");
        wrap.className = "chat-msg " + (type || "bot");

        if (author) {
            const label = document.createElement("span");
            label.className = "chat-msg-label";
            label.textContent = author;
            wrap.appendChild(label);
        }

        if (type === "bot") {
            wrap.innerHTML += marked.parse(text);
        } else {
            wrap.appendChild(document.createTextNode(text));
        }

        body.appendChild(wrap);
        scrollToBottom();
        return wrap;
    }

    function typeMessage(author, text, type) {
        const wrap = document.createElement("div");
        wrap.className = "chat-msg " + (type || "bot");

        if (author) {
            const label = document.createElement("span");
            label.className = "chat-msg-label";
            label.textContent = author;
            wrap.appendChild(label);
        }

        const content = document.createElement("div");
        content.className = "typing-content";
        wrap.appendChild(content);

        body.appendChild(wrap);
        scrollToBottom();

        let skipped = false;
        wrap.addEventListener("click", () => { skipped = true; });

        let i = 0;
        const interval = setInterval(() => {
            if (skipped || i >= text.length) {
                clearInterval(interval);
                content.innerHTML = marked.parse(text);
                scrollToBottom();
                return;
            }
            i++;
            content.innerHTML = marked.parse(text.slice(0, i));
            scrollToBottom();
        }, 30);
    }

    function addTyping() {
        const wrap = document.createElement("div");
        wrap.className = "chat-msg bot";
        wrap.id = "chat-typing";

        const label = document.createElement("span");
        label.className = "chat-msg-label";
        label.textContent = AUTHOR_LABEL;
        wrap.appendChild(label);

        const dots = document.createElement("div");
        dots.className = "thinking-dots";
        dots.innerHTML = "<span></span><span></span><span></span>";
        wrap.appendChild(dots);

        body.appendChild(wrap);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = document.getElementById("chat-typing");
        if (typing) typing.remove();
    }

    function renderChips() {
        const wrap = document.createElement("div");
        wrap.className = "chat-chips";

        SUGGESTIONS.forEach((suggestion) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chat-chip";
            chip.textContent = suggestion;
            chip.addEventListener("click", () => sendMessage(suggestion));
            wrap.appendChild(chip);
        });

        body.appendChild(wrap);
        scrollToBottom();
    }


    /* ==========================================
       Toggle
    ========================================== */

    function openChat() {
        panel.classList.add("open");
        panel.setAttribute("aria-hidden", "false");
        launcher.classList.add("active");
        launcher.setAttribute("aria-expanded", "true");
        input.focus();

        // Pre-warm Render service (fire-and-forget)
        fetch(API_URL.replace(/\/+$/, ""), { method: "GET" })
            .catch(() => {});

        if (firstOpen) {
            firstOpen = false;
            addMessage(AUTHOR_LABEL, WELCOME, "bot");
            renderChips();
        }
    }

    function closeChat() {
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
        launcher.classList.remove("active");
        launcher.setAttribute("aria-expanded", "false");
    }


    /* ==========================================
       API
    ========================================== */

    async function ask(message) {
        const response = await fetch(API_URL.replace(/\/+$/, "") + ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error("API error " + response.status);
        }

        const data = await response.json();
        return data.response;
    }


    /* ==========================================
       Send
    ========================================== */

    async function sendMessage(preset) {
        const message = (
            typeof preset === "string" ? preset : input.value
        ).trim();

        if (!message || sendBtn.disabled) {
            return;
        }

        input.value = "";

        addMessage("you", message, "user");

        sendBtn.disabled = true;
        addTyping();

        try {
            const answer = await ask(message);
            removeTyping();
            typeMessage(AUTHOR_LABEL, answer, "bot");
        } catch (error) {
            console.error("Chat error:", error);
            removeTyping();
            addMessage(AUTHOR_LABEL, "! " + error.message + " — I may be offline. Try again in a moment.", "error");
        } finally {
            sendBtn.disabled = false;
            input.focus();
        }
    }


    /* ==========================================
       Events
    ========================================== */

    launcher.addEventListener("click", () => {
        panel.classList.contains("open") ? closeChat() : openChat();
    });

    closeBtn.addEventListener("click", closeChat);

    sendBtn.addEventListener("click", () => sendMessage());

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && panel.classList.contains("open")) {
            closeChat();
        }
    });

})();
