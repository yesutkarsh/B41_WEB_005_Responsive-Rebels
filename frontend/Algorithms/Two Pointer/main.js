let container = document.getElementById("container");
let generate = document.getElementById("generate");
let sort = document.getElementById("sort");
let userArr = document.getElementById("userArr");
let speedControl = document.getElementById("speedControl");
let targetInput = document.getElementById("target");
let clear = document.getElementById("clear")

clear.addEventListener("click",()=>{
    location.reload()
})

speedControl.value = "0";


container.innerHTML = "";
userArr.value = "";

let isSorting = false;

generate.addEventListener("click", () => {
    if (isSorting) {
        return;
    }
    let newArr = generateArr();
    userArr.value = newArr.join(", ");  // Update the input field
    displayArr(newArr);  // Display the generated array
});

function generateArr(size = 10) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 90) + 10);  // Generate random numbers
    }
    return arr;
}

function displayArr(arr) {
    container.innerHTML = "";  // Clear the container before displaying new bars
    arr.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;  // Set the height of the bar
        bar.textContent = value;  // Show the value of the bar
        container.appendChild(bar);  // Append the bar to the container
    });
}

function userInputFun(input) {
    input = input.replace(/,$/, ''); // Remove trailing comma
    let arr = input.split(",").map(n => +n.trim());
    if (arr.every(num => !isNaN(num) && num > 0)) {
        return arr;
    }
    return null;  // Return null if any number is invalid
}

async function twoPointersVisualizer(arr, target) {
    let bars = document.getElementsByClassName("bar");
    let pairFound = false; // Flag to track if a pair is found

    if (isSorting) {
        return;
    }
    isSorting = true;

    // Sort the array before using the two-pointer method
    arr.sort((a, b) => a - b);

    // Display the sorted array
    displayArr(arr);

    let left = 0;
    let right = arr.length - 1;

    // Reset all bars before starting the animation
    Array.from(bars).forEach(bar => {
        bar.classList.remove("highlight");
        bar.classList.remove("done");
    });

    while (left < right) {
        let bar1 = bars[left];
        let bar2 = bars[right];

        // Add highlight to current bars
        bar1.classList.add("highlight");
        bar2.classList.add("highlight");

        await new Promise(resolve => setTimeout(resolve, speed()));

        let sum = arr[left] + arr[right];

        if (sum === target) {
            // When pair is found, add 'done' class with some delay
            bar1.classList.add("done");
            bar2.classList.add("done");

            // Wait before continuing the animation, allowing color change to be visible
            await new Promise(resolve => setTimeout(resolve, speed()));

            alert(`Pair Found: ${arr[left]} + ${arr[right]} = ${target}`);
            pairFound = true; // Mark that the pair was found
            break;
        } else if (sum < target) {
            // Remove highlight from the left bar and move the left pointer
            bar1.classList.remove("highlight");
            left++;
        } else {
            // Remove highlight from the right bar and move the right pointer
            bar2.classList.remove("highlight");
            right--;
        }

        // Wait between iterations to make the animation visible
        await new Promise(resolve => setTimeout(resolve, speed()));
    }

    // If no pair was found after the loop, alert the user
    if (!pairFound) {
        alert(`No pair found that sums to ${target}`);
    }

    isSorting = false;
}


function speed() {
    let value = speedControl.value;

    if (value == "1") {
        return 500;  // Slow speed
    } else if (value == "2") {
        return 250;  // Medium speed
    } else if (value == "3") {
        return 100;  // Fast speed
    }
}

sort.addEventListener("click", async () => {
    if (isSorting) {
        return;
    }
    let userInput = userArr.value.trim();
    let userarr = userInputFun(userInput);

    if (userarr) {
        let target = targetInput.value;
        if (isNaN(target) || target === "") {
            alert("Please enter a valid target sum.");
            return;
        }

        // Convert target to a number
        target = parseInt(target);

        displayArr(userarr);
        await twoPointersVisualizer(userarr, target);
    } else {
        alert("Please enter a valid array of numbers separated by commas before sorting.");
    }
});
