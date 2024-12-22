// Constants for visualization
const MAX_BAR_HEIGHT = 480;
const MAX_INPUT_VALUE = 125;
const SCALE_FACTOR = 4.5;
const BASE_HEIGHT = 5;

let array = [];
let isSorting = false;

// Get DOM elements
const container = document.getElementById("container");
const userInput = document.getElementById("userArr");
const speedControl = document.getElementById("speedControl");

// Generate initial array when page loads
// window.onload = function() {
//     generateArr();
// };

function generateArr() {
    if (isSorting) return;
    
    array = [];
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    
    // Update the input field with the generated array
    if (userInput) {
        userInput.value = array.join(", ");
    }
    
    displayArr(array);
}

function displayArr(arr) {
    container.innerHTML = "";
    
    const maxValue = Math.max(...arr);
    const scaleFactor = maxValue > MAX_INPUT_VALUE ? 
        (MAX_BAR_HEIGHT / (maxValue * SCALE_FACTOR)) : 1;

    arr.forEach(value => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        
        // Create a separate span for the number
        let numberLabel = document.createElement("span");
        numberLabel.classList.add("bar-label");
        numberLabel.textContent = value;
        
        const scaledHeight = (value * SCALE_FACTOR * scaleFactor) + BASE_HEIGHT;
        bar.style.height = `${scaledHeight}px`;
        
        // Add the number label to the bar
        bar.appendChild(numberLabel);
        container.appendChild(bar);
    });
}

function userInputFun(input) {
    if (!input) return null;
    
    input = input.replace(/,$/, '');
    let arr = input.split(",").map(n => +n.trim());

    if (!arr.every(num => !isNaN(num))) {
        alert("Please enter valid numbers only.");
        return null;
    }

    if (arr.length > 50) {
        alert("Please enter no more than 50 numbers for better visualization.");
        return null;
    }

    if (arr.some(num => num < 0)) {
        alert("Please enter positive numbers only.");
        return null;
    }

    return arr;
}

async function selectionSort(arr) {
    if (!arr || arr.length === 0) return;
    
    let bars = document.getElementsByClassName("bar");
    if (isSorting) return;
    
    isSorting = true;
    const maxValue = Math.max(...arr);
    const scaleFactor = maxValue > MAX_INPUT_VALUE ? 
        (MAX_BAR_HEIGHT / (maxValue * SCALE_FACTOR)) : 1;

    try {
        for (let i = 0; i < arr.length - 1 && isSorting; i++) {
            let min_idx = i;
            bars[i].style.backgroundColor = "red";

            // Find the minimum element in unsorted array
            for (let j = i + 1; j < arr.length && isSorting; j++) {
                // Color the current comparison element
                bars[j].style.backgroundColor = "red";
                await new Promise(resolve => setTimeout(resolve, speed()));

                if (!isSorting) {
                    // Reset all bars to original color
                    for (let k = 0; k < bars.length; k++) {
                        bars[k].style.backgroundColor = "#3498db";
                    }
                    return;
                }

                if (arr[j] < arr[min_idx]) {
                    // Reset previous minimum's color if it's not the starting position
                    if (min_idx !== i) {
                        bars[min_idx].style.backgroundColor = "#3498db";
                    }
                    min_idx = j;
                    // Color new minimum
                    bars[min_idx].style.backgroundColor = "purple";
                } else {
                    // Reset color if not minimum
                    if (j !== min_idx) {
                        bars[j].style.backgroundColor = "#3498db";
                    }
                }
            }

            if (!isSorting) {
                // Reset all bars to original color
                for (let k = 0; k < bars.length; k++) {
                    bars[k].style.backgroundColor = "#3498db";
                }
                return;
            }

            // Swap the found minimum element with the first element
            if (min_idx !== i) {
                await new Promise(resolve => setTimeout(resolve, speed()));
                
                // Swap array elements
                let temp = arr[i];
                arr[i] = arr[min_idx];
                arr[min_idx] = temp;
                
                // Update heights and content
                const height1 = (arr[i] * SCALE_FACTOR * scaleFactor) + BASE_HEIGHT;
                const height2 = (arr[min_idx] * SCALE_FACTOR * scaleFactor) + BASE_HEIGHT;
                
                bars[i].style.height = `${height1}px`;
                bars[i].querySelector('.bar-label').textContent = arr[i];
                bars[min_idx].style.height = `${height2}px`;
                bars[min_idx].querySelector('.bar-label').textContent = arr[min_idx];
            }
            
            // Mark current position as sorted
            if (isSorting) {
                bars[i].style.backgroundColor = "green";
            }
        }
        
        // Color the last element green only if sorting completed
        if (isSorting) {
            bars[arr.length - 1].style.backgroundColor = "green";
        }
        
    } catch (error) {
        console.error("Error during sorting:", error);
    } finally {
        isSorting = false;
    }
}

function speed() {
    let value = document.getElementById("speedControl").value;
    
    if (value == "1") return 1000;
    if (value == "2") return 500;
    if (value == "3") return 100;
    return 250; // Default speed
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate");
    const sortButton = document.getElementById("sort");
    const stopButton = document.getElementById("stop");
    const clearButton = document.getElementById("clear");
    const userInput = document.getElementById("userArr");
    
    // Clear input field on page load
    if (userInput) {
        userInput.value = "";
    }
    
    // Clear any existing bars
    const container = document.getElementById("container");
    if (container) {
        container.innerHTML = "";
    }
    
    if (generateButton) {
        generateButton.addEventListener("click", generateArr);
    }
    
    if (sortButton) {
        sortButton.addEventListener("click", () => {
            let input = userInput.value;
            array = input === "" ? array : userInputFun(input);
            if (array) selectionSort(array);
        });
    }

    if (stopButton) {
        stopButton.addEventListener("click", () => {
            isSorting = false;
        });
    }

    // Add clear button functionality
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            if (isSorting) {
                alert("Please stop the sorting first!");
                return;
            }
            // Clear the input field
            if (userInput) {
                userInput.value = "";
            }
            // Clear the bars
            if (container) {
                container.innerHTML = "";
            }
            // Reset the array
            array = [];
        });
    }
});