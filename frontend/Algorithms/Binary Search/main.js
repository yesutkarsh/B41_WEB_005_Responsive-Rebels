let container = document.getElementById("container");
let generate = document.getElementById("generate");
let search = document.getElementById("search");
let userArr = document.getElementById("userArr");
let speedControl = document.getElementById("speedControl");
let stop = document.getElementById("stop");

speedControl.value = "2";

stop.addEventListener("click", () => {
    location.reload();
});

container.innerHTML = "";
userArr.value = "";

let isSearching = false;

generate.addEventListener("click", () => {
    if (isSearching) {
        return;
    }
    let newArr = generateArr();
    userArr.value = newArr.join(", ");
    displayArr(newArr);
});

function generateArr(size = 10) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 90) + 10);
    }
    return arr.sort((a, b) => a - b);
}

function displayArr(arr) {
    container.innerHTML = "";
    arr.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        container.appendChild(bar);
    });
}

function userInputFun(input) {
    input = input.replace(/,$/, ''); // Remove trailing comma
    let arr = input.split(",").map(n => +n.trim());
    if (arr.every(num => !isNaN(num))) {
        return arr.sort((a, b) => a - b);
    }
    return null;
}

async function binarySearchVisualizer(arr, target) {
    let bars = document.getElementsByClassName("bar");

    if (isSearching) {
        return;
    }
    isSearching = true;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        let barLeft = bars[left];
        let barRight = bars[right];
        let barMid = bars[mid];

        barLeft.classList.add("highlight");
        barRight.classList.add("highlight");
        barMid.classList.add("highlight");

        await new Promise(resolve => setTimeout(resolve, speed()));

        let value = arr[mid];

        if (value === target) {
            barMid.classList.remove("highlight");
            barMid.classList.add("found");
            alert(`Element Found: ${value}`);
            break;
        } else if (value < target) {
            barLeft.classList.remove("highlight");
            for (let i = left; i <= mid; i++) {
                bars[i].classList.add("checked");
            }
            left = mid + 1;
        } else {
            barRight.classList.remove("highlight");
            for (let i = mid; i <= right; i++) {
                bars[i].classList.add("checked");
            }
            right = mid - 1;
        }
    }

    if (left > right) {
        alert("Element Not Found");
    }

    isSearching = false;
}

function speed() {
    let value = speedControl.value;

    if (value == "1") {
        return 1000;
    } else if (value == "2") {
        return 500;
    } else if (value == "3") {
        return 100;
    }
}

search.addEventListener("click", async () => {
    if (isSearching) {
        return;
    }
    let userInput = userArr.value.trim();
    let userarr = userInputFun(userInput);

    if (userarr) {
        let target = parseInt(prompt("Enter target element for Binary Search:"));
        if (isNaN(target)) {
            alert("Please enter a valid target element.");
            return;
        }
        displayArr(userarr);
        await binarySearchVisualizer(userarr, target);
    } else {
        alert("Please enter a valid array of numbers separated by commas before searching.");
    }
});
