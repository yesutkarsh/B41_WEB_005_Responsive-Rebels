const { animate } = Motion;

// Toggle Side Panel
let hamburger = document.getElementById("hamBurger");
let sidePanel = document.getElementById("SidePanel");
let closeSidePanel = document.getElementById("closeSidePanel");

// buttons for Algorithms
let bubble = document.getElementById("bubble")
let selection = document.getElementById("selection")
let linked = document.getElementById("linked")


bubble.addEventListener("click",()=>{
    changeDis("Bubble Sort")
})
selection.addEventListener("click",()=>{
    changeDis("Selection Sort")
})
linked.addEventListener("click",()=>{
    changeDis("Linked List")
})

// Opening Side Panel
hamburger.addEventListener("click", () => {
    sidePanel.style.transform = "translateX(-100%)";
    sidePanel.style.display = "flex";
        animate(sidePanel, { transform: "translateX(0)" }, { duration: 0.5 });
});

// Closing Side Panel
closeSidePanel.addEventListener("click", () => {
    animate(sidePanel, { transform: "translateX(-100%)" }, { duration: 0.5 })
        .then(() => {
            sidePanel.style.display = "none";
        });
});

// Redirecting function on clicking On algo buttns
// function changeDis(value){
//      window.location.href =  `../Algorithms/${value}/main.html`
// }