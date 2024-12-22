let container = document.getElementById("container")
let generate = document.getElementById("generate")
let sort = document.getElementById("sort")
let userArr = document.getElementById("userArr")
let speedControl = document.getElementById("speedControl")
let stop = document.getElementById("stop")
let clear = document.getElementById("clear")

speedControl.value = "0"

container.innerHTML = "";
userArr.value = ""; 

let isSorting =  false;

generate.addEventListener("click",()=>{
    if(isSorting){
        return;
    }
    let newArr = generateArr()
    userArr.value = newArr.join(", ")
    displayArr(newArr)
})

function generateArr(size = 10){
    let arr = [];
    for(let i=0;i<size;i++){
        arr.push(Math.floor(Math.random()*100)+5)
    }
    return arr;
}

// Update these constants
const MAX_BAR_HEIGHT = 480;
const MAX_INPUT_VALUE = 125;
const SCALE_FACTOR = 4.5; // Increased for better differentiation
const BASE_HEIGHT = 5; // Base height instead of minimum height

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

    const warningElement = document.getElementById("warning-message");
    if (maxValue > MAX_INPUT_VALUE) {
        warningElement.style.display = "block";
        warningElement.textContent = "Note: Values have been scaled to fit the display";
    } else {
        warningElement.style.display = "none";
    }
}

function userInputFun(input) {
    input = input.replace(/,$/, '');
    let arr = input.split(",").map(n => +n.trim());

    // Validate numbers
    if (!arr.every(num => !isNaN(num))) {
        alert("Please enter valid numbers only.");
        return null;
    }

    // Check for reasonable array size
    if (arr.length > 50) {
        alert("Please enter no more than 50 numbers for better visualization.");
        return null;
    }

    // Check for negative numbers
    if (arr.some(num => num < 0)) {
        alert("Please enter positive numbers only.");
        return null;
    }

    return arr;
}

async function bubbleSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (isSorting) return;
    
    isSorting = true;
    const maxValue = Math.max(...arr);
    const scaleFactor = maxValue > MAX_INPUT_VALUE ? 
        (MAX_BAR_HEIGHT / (maxValue * SCALE_FACTOR)) : 1;

    try {
        for (let i = 0; i < arr.length - 1 && isSorting; i++) {
            for (let j = 0; j < arr.length - i - 1 && isSorting; j++) {
                let bar1 = bars[j];
                let bar2 = bars[j + 1];

                bar1.style.backgroundColor = "red";
                bar2.style.backgroundColor = "red";

                await new Promise(resolve => setTimeout(resolve, speed()));

                if (!isSorting) {  // Check if sorting should stop
                    // Reset all bars to original color
                    for (let k = 0; k < bars.length; k++) {
                        bars[k].style.backgroundColor = "#3498db";
                    }
                    return;
                }

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    
                    const height1 = (arr[j] * SCALE_FACTOR * scaleFactor) + BASE_HEIGHT;
                    const height2 = (arr[j + 1] * SCALE_FACTOR * scaleFactor) + BASE_HEIGHT;
                    
                    bar1.style.height = `${height1}px`;
                    bar1.querySelector('.bar-label').textContent = arr[j];
                    bar2.style.height = `${height2}px`;
                    bar2.querySelector('.bar-label').textContent = arr[j + 1];
                }

                bar1.style.backgroundColor = "#3498db";
                bar2.style.backgroundColor = "#3498db";
            }

            if (isSorting) {  // Only color if still sorting
                bars[arr.length - 1 - i].style.backgroundColor = "green";
                if (i == arr.length - 2) {
                    bars[0].style.backgroundColor = "green";
                }
            }
        }
    } catch (error) {
        console.error("Error during sorting:", error);
    } finally {
        isSorting = false;
    }
}

function speed(){
    let value = speedControl.value;

    if(value == "1"){
        return 1000;
    }
    else if(value == "2"){
        return 500;
    }
    else if(value == "3"){
        return 100;
    }
}

sort.addEventListener("click",async ()=>{

    if(isSorting){
        return;
    }
    let userInput = userArr.value.trim();
    let userarr = userInputFun(userInput)

    if(userarr){
        displayArr(userarr);
        
        await bubbleSort(userarr)
    }
    else{
        alert("Please enter a valid array of numbers separated by commas before sorting.")
    }
})

// Remove or comment out any window.onload function if it exists
// window.onload = function() {
//     generateArr();
// };

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
            if (array) bubbleSort(array);
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
            // if (isSorting) {
            //     alert("Please stop the sorting first!");
            //     return;
            // }
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