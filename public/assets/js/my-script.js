function closeOptions() {
    document.getElementById("options-list").classList.remove("show");
}

document.addEventListener("click", function (event) {
    const selectBox = document.querySelector(".custom-select");
    if (selectBox && !selectBox.contains(event.target)) {
        closeOptions();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const selectBox = document.querySelector(".custom-select");
        if (selectBox && !selectBox.contains(event.target)) {
            closeOptions();
        }
    }
});