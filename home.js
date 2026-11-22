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

