function closeOptions() {
    const el1 = document.getElementById("options-search-filter-department");
    if (el1) el1.classList.remove("show");

    const el2 = document.getElementById("options-search-filter-job-position");
    if (el2) el2.classList.remove("show");

    const el3 = document.getElementById("options-search-filter-duty");
    if (el3) el3.classList.remove("show");

    const el4 = document.getElementById("options-department-filter");
    if (el4) el4.classList.remove("show");

    const el5 = document.getElementById("options-jp-timekeeping");
    if (el5) el5.classList.remove("show");

    const el6 = document.getElementById("options-time-leave-start");
    if (el6) el6.classList.remove("show");

    const el7 = document.getElementById("options-time-leave-end");
    if (el7) el7.classList.remove("show");
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
