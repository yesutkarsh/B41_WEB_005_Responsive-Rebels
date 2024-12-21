let container = document.getElementById("container");
let generate = document.getElementById("generate");
let sort = document.getElementById("sort");
let userArr = document.getElementById("userArr");
let speedControl = document.getElementById("speedControl");
let stop = document.getElementById("stop");

speedControl.value = "0";

stop.addEventListener("click", () => {
    location.reload();
});

container.innerHTML = "";
userArr.value = "";

let isSorting = false;

generate.addEventListener("click", () => {
    if (isSorting) {
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
        return arr;
    }
    return null;
}

async function twoPointersVisualizer(arr, target) {
    let bars = document.getElementsByClassName("bar");

    if (isSorting) {
        return;
    }
    isSorting = true;

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let bar1 = bars[left];
        let bar2 = bars[right];

        bar1.classList.add("highlight");
        bar2.classList.add("highlight");

        await new Promise(resolve => setTimeout(resolve, speed()));

        let sum = arr[left] + arr[right];

        if (sum === target) {
            bar1.classList.add("done");
            bar2.classList.add("done");
            alert(`Pair Found: ${arr[left]} + ${arr[right]} = ${target}`);
            break;
        } else if (sum < target) {
            bar1.classList.remove("highlight");
            left++;
        } else {
            bar2.classList.remove("highlight");
            right--;
        }
    }

    isSorting = false;
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

sort.addEventListener("click", async () => {
    if (isSorting) {
        return;
    }
    let userInput = userArr.value.trim();
    let userarr = userInputFun(userInput);

    if (userarr) {
        let target = parseInt(prompt("Enter target sum for Two Pointers:"));
        if (isNaN(target)) {
            alert("Please enter a valid target sum.");
            return;
        }
        displayArr(userarr);
        await twoPointersVisualizer(userarr, target);
    } else {
        alert("Please enter a valid array of numbers separated by commas before sorting.");
    }
});
