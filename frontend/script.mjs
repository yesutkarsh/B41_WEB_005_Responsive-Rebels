const { animate } = Motion;

// Toggle Side Panel
let hamburger = document.getElementById("hamBurger");
let sidePanel = document.getElementById("SidePanel");
let closeSidePanel = document.getElementById("closeSidePanel");

// Opening Side Panel
hamburger.addEventListener("click", () => {
    animate(sidePanel, { transform: "translateX(0)" }, { duration: 0.5 });
    sidePanel.style.display = "flex";
});

// Closing Side Panel
closeSidePanel.addEventListener("click", () => {
    animate(sidePanel, { transform: "translateX(-100%)" }, { duration: 0.5 })
        .then(() => {
            sidePanel.style.display = "none";
        });
});
