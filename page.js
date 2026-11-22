const storageKey = "mindspace-pages";
const pageId = new URLSearchParams(window.location.search).get("id");
const pages = JSON.parse(localStorage.getItem(storageKey) || "[]");
const page = pages.find(savedPage => savedPage.id === pageId);
const title = document.getElementById("page-title");
const textArea = document.getElementById("page-text");
const error = document.getElementById("page-error");

if (page) {
    document.title = `${page.name} - MindSpace`;
    title.textContent = page.name;
    textArea.value = page.text || "";

    textArea.addEventListener("input", () => {
        page.text = textArea.value;
        localStorage.setItem(storageKey, JSON.stringify(pages));
    });
} else {
    title.textContent = "Seite nicht gefunden";
    textArea.hidden = true;
    error.textContent = "Diese Seite existiert nicht mehr. Gehe zurück zur Startseite, um eine neue Seite anzulegen.";
    error.hidden = false;
}
