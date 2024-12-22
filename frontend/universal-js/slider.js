const { animate } = Motion;

// Toggle Side Panel
let hamburger = document.getElementById("hamBurger");
let sidePanel = document.getElementById("SidePanel");
let closeSidePanel = document.getElementById("closeSidePanel");

// buttons for Algorithms
let bubble = document.getElementById("bubble")
let selection = document.getElementById("selection")
let linked = document.getElementById("linked")

let black = document.getElementById("black")


// Opening Side Panel
hamburger.addEventListener("click", () => {
    sidePanel.style.transform = "translateX(-100%)";
    black.style.display="flex"
    sidePanel.style.display = "flex";
        animate(sidePanel, { transform: "translateX(0)" }, { duration: 0.5 });
});

// Closing Side Panel



black.addEventListener("click", () => {
    animate(sidePanel, { transform: "translateX(-100%)" }, { duration: 0.5 })
    .then(() => {
            black.style.display="none"
            sidePanel.style.display = "none";
        });
});



closeSidePanel.addEventListener("click", () => {
    animate(sidePanel, { transform: "translateX(-100%)" }, { duration: 0.5 })
        .then(() => {
            sidePanel.style.display = "none";
        });
});

