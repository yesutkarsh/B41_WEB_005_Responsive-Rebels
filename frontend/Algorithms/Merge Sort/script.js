// All Step
let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let step4 = document.getElementById("step4");

// next button
let nextButton = document.getElementById("next");

// previous button
let previousButton = document.getElementById("previous");

let stepCount = 2;

function Appearstep2() {
    step2.style.display = "flex";
}

function Appearstep3() {
    step3.style.display = "flex";
}

function Appearstep4() {
    step4.style.display = "flex";
}

let step1Child = step1.getElementsByTagName('span');
let step2Child = step2.getElementsByTagName('span');
let step3Child = step3.getElementsByTagName('span');
let step4Child = step4.getElementsByTagName('span');

// Comparing Step4
function compareOne() {
    // Clearing Upper Boxes
    step3Child[0].innerText = "";
    step3Child[1].innerText = "";

    step4.style.display = "flex";
    step4Child[0].style.backgroundColor = "#828";
}
function compareTwo() {
    step4.style.display = "flex";
    step4Child[1].style.backgroundColor = "#828";
}
function compareThree() {
    step3Child[0].innerText = "1";
    step4.style.display = "flex";
    step4Child[0].style.display = "none";
    step3Child[0].style.backgroundColor = "#828";
}
function compareFour() {
    // filling the value 
    step3Child[1].innerText = "23";
    step4.style.display = "flex";
    step4Child[1].style.display = "none";
    step3Child[0].style.backgroundColor = "green";
    step3Child[1].style.backgroundColor = "green";
}

// Comapring Step 3
function compareFive() {
    // clearing upper boxes
    step2Child[0].innerText = "";
    step2Child[1].innerText = "";
    step2Child[2].innerText = "";

    step3Child[0].style.backgroundColor = "#828";
    step3Child[2].style.backgroundColor = "#828";
}
function compareSix() {
    // filling the value 
    step2Child[0].innerText = "1";
    step3Child[0].style.display = "none";
    step2Child[0].style.backgroundColor = "#828";
}
function compareSeven() {
    step3Child[1].style.backgroundColor = "#828";
    step3Child[2].style.backgroundColor = "#828";
}
function compareEight() {
    step2Child[1].innerText = "23";
    step3Child[1].style.display = "none";
    step3Child[2].style.backgroundColor = "#828";
    step2Child[1].style.backgroundColor = "#828";
}
function compareNine() {
    step2Child[2].innerText = "42";
    step3Child[2].style.display = "none";
    step2Child[0].style.backgroundColor = "green";
    step2Child[1].style.backgroundColor = "green";
    step2Child[2].style.backgroundColor = "green";
}
function compareTen() {
    // clearing upper boxes
    step2Child[3].innerText = "";
    step2Child[4].innerText = "";

    step3Child[3].style.backgroundColor = "#828";
    step3Child[4].style.backgroundColor = "#828";
}
function compareEleven() {
    step2Child[3].style.backgroundColor = "#828";
    step3Child[4].style.display = "none";
    step2Child[3].innerText = "5";
}
function compareTwelve() {
    step2Child[3].style.backgroundColor = "green";
    step2Child[4].style.backgroundColor = "green";
    step3Child[3].style.display = "none";
    step2Child[4].innerText = "8";
}

// Sorting step2
function compareThirteen() {
    step1Child[0].innerText = "";
    step1Child[1].innerText = "";
    step1Child[2].innerText = "";
    step1Child[3].innerText = "";
    step1Child[4].innerText = "";
    step2Child[0].style.backgroundColor = "#828";
    step2Child[3].style.backgroundColor = "#828";
}

function compareFourteen() {
    step1Child[0].innerText = "1";
    step1Child[0].style.backgroundColor = "green";
    step2Child[0].style.display = "none";
    step2Child[3].style.backgroundColor = "green";
}

function compareFiveteen() {
    step2Child[1].style.backgroundColor = "#828";
    step2Child[3].style.backgroundColor = "#828";
}

function compareSixteen() {
    step1Child[1].innerText = "5";
    step1Child[1].style.backgroundColor = "green";
    step2Child[3].style.display = "none";
}

function compareSeventeen() {
    step2Child[4].style.backgroundColor = "#828";
}

function compareEighteen() {
    step1Child[2].innerText = "8";
    step1Child[2].style.backgroundColor = "green";
    step2Child[4].style.display = "none";
    step2Child[1].style.backgroundColor = "green";
}

function compareNineteen() {
    step2Child[1].style.backgroundColor = "#828";
    step2Child[2].style.backgroundColor = "#828";
}

function compareTwenty() {
    step1Child[3].innerText = "23";
    step1Child[3].style.backgroundColor = "green";

    step1Child[4].innerText = "42";
    step1Child[4].style.backgroundColor = "green";

    step2Child[1].style.display = "none";
    step2Child[2].style.display = "none";
}

// Handle Next and Previous Button Logic
nextButton.addEventListener("click", handleNext);
previousButton.addEventListener("click", handlePrevious);

function handleNext() {
    switch (stepCount) {
        case 2:
            Appearstep2();
            break;
        case 3:
            Appearstep3();
            break;
        case 4:
            Appearstep4();
            break;
        case 5:
            compareOne();
            break;
        case 6:
            compareTwo();
            break;
        case 7:
            compareThree();
            break;
        case 8:
            compareFour();
            break;
        case 9:
            compareFive();
            break;
        case 10:
            compareSix();
            break;
        case 11:
            compareSeven();
            break;
        case 12:
            compareEight();
            break;
        case 13:
            compareNine();
            break;
        case 14:
            compareTen();
            break;
        case 15:
            compareEleven();
            break;
        case 16:
            compareTwelve();
            break;
        case 17:
            compareThirteen();
            break;
        case 18:
            compareFourteen();
            break;
        case 19:
            compareFiveteen();
            break;
        case 20:
            compareSixteen();
            break;
        case 21:
            compareSeventeen();
            break;
        case 22:
            compareEighteen();
            break;
        case 23:
            compareNineteen();
            break;
        case 24:
            compareTwenty();
            break;
        default:
            console.log("All steps are displayed");
    }
    stepCount++;
}

function handlePrevious() {
    stepCount--;
    switch (stepCount) {
        case 2:
            step2.style.display = "none";
            break;
        case 3:
            step3.style.display = "none";
            break;
        case 4:
            step4.style.display = "none";
            break;
        case 5:
            step4.style.display = "none";
            break;
        case 6:
            step3Child[0].innerText = "";
            step3Child[1].innerText = "";
            break;
        case 7:
            step2Child[0].innerText = "";
            step2Child[1].innerText = "";
            step2Child[2].innerText = "";
            break;
        case 8:
            step1Child[0].innerText = "";
            break;
        default:
            console.log("No previous step");
    }
}