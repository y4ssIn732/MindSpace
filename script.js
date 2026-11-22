const logo = document.getElementById("logo");

if (localStorage.getItem("darkmode") === "on"){
    document.body.classList.add("dark")
}

logo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkmode", "on");
    } else {
        localStorage.setItem("darkmode", "off");
    }
});

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("#navitems a").forEach(link => {
    if(link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

const wordWindow = document.querySelector(".word-window");

if (wordWindow) {
    const wordViewport = wordWindow.querySelector(".word-viewport");
    const wordGlow = wordWindow.querySelector(".word-glow");
    const words = ["space", "ideas", "feelings", "opinions"];
    let wordIndex = 0;

    window.setInterval(() => {
        const currentWord = wordViewport.querySelector("span");
        const currentGlow = wordGlow.querySelector("span");
        const nextWord = document.createElement("span");
        const nextGlow = document.createElement("span");

        nextWord.textContent = words[wordIndex];
        nextGlow.textContent = words[wordIndex];
        nextWord.classList.add("word-entering");
        nextGlow.classList.add("word-entering");
        currentWord.classList.add("word-leaving");
        currentGlow.remove();
        wordViewport.append(nextWord);
        wordGlow.append(nextGlow);
        wordIndex = (wordIndex + 1) % words.length;

        window.setTimeout(() => {
            currentWord.remove();
            nextWord.classList.remove("word-entering");
            nextGlow.classList.remove("word-entering");
        }, 500);
    }, 3000);
}

const pageCards = document.getElementById("page-cards");

if (pageCards) {
    const storageKey = "mindspace-pages";
    const addButton = document.getElementById("add-page");
    const nameForm = document.getElementById("page-name-form");
    const nameInput = document.getElementById("page-name");
    const savedPages = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const renderPage = page => {
        const link = document.createElement("a");
        link.className = "page-card page-link";
        link.href = `page.html?id=${encodeURIComponent(page.id)}`;
        link.textContent = page.name;
        link.setAttribute("aria-label", `${page.name} öffnen`);
        pageCards.insertBefore(link, addButton);
    };

    savedPages.forEach(renderPage);

    addButton.addEventListener("click", () => {
        addButton.hidden = true;
        nameForm.hidden = false;
        nameInput.focus();
    });

    const cancelEditing = () => {
        nameForm.hidden = true;
        addButton.hidden = false;
        nameInput.value = "";
        nameInput.size = 1;
    };

    const savePage = () => {
        if (nameForm.hidden) {
            return;
        }

        const page = {
            id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
            name: nameInput.value.trim(),
            text: ""
        };
        savedPages.push(page);
        localStorage.setItem(storageKey, JSON.stringify(savedPages));
        renderPage(page);
        nameForm.hidden = true;
        addButton.hidden = false;
        nameInput.value = "";
        nameInput.size = 1;
    };

    nameInput.addEventListener("input", () => {
        nameInput.setCustomValidity("");
        nameInput.size = Math.max(1, nameInput.value.length);
    });
    nameInput.addEventListener("blur", () => {
        if (!nameForm.hidden) {
            if (nameInput.value.trim()) {
                savePage();
            } else {
                cancelEditing();
            }
        }
    });

    nameInput.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            event.preventDefault();
            cancelEditing();
        }
    });

    nameForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!nameInput.value.trim()) {
            nameInput.setCustomValidity("Bitte gib einen Namen ein.");
            nameInput.reportValidity();
            return;
        }

        savePage();
    });
}

