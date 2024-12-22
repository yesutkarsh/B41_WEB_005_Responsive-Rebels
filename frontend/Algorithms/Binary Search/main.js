document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById("container");
    let generate = document.getElementById("generate");
    let search = document.getElementById("search");
    let userArr = document.getElementById("userArr");
    let speedControl = document.getElementById("speedControl");
    let targetV = document.getElementById("target");
    let clear = document.getElementById("clear");

    if (!container || !generate || !search || !userArr || !speedControl || !targetV) {
        console.error("One or more required elements are missing from the DOM");
        return;
    }

    speedControl.value = "2";

    clear.addEventListener("click", () => {
        container.innerHTML = "";
        userArr.value = "";
    });

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
        
        // Find the maximum value in the array
        const maxValue = Math.max(...arr);
        
        // Calculate scale factor based on container height and maximum value
        const containerHeight = 450; // matches CSS container height
        const minHeight = 30;  // minimum height for visibility
        const scaleFactor = (containerHeight - minHeight) / maxValue;
        
        arr.forEach(value => {
            let bar = document.createElement("div");
            bar.classList.add("bar");
            
            // Create label for the bar
            let numberLabel = document.createElement("span");
            numberLabel.classList.add("bar-label");
            numberLabel.textContent = value;
            
            // Calculate height proportionally
            const height = (value * scaleFactor) + minHeight;
            bar.style.height = `${height}px`;
            
            bar.appendChild(numberLabel);
            container.appendChild(bar);
        });
    }

    function userInputFun(input) {
        if (!input.trim()) return null;
        input = input.replace(/,$/, '');
        let arr = input.split(",").map(n => +n.trim());
        if (arr.every(num => !isNaN(num))) {
            return arr.sort((a, b) => a - b);
        }
        return null;
    }

    function clearVisualization() {
        const bars = document.getElementsByClassName("bar");
        Array.from(bars).forEach(bar => {
            bar.classList.remove("highlight", "checked", "found");
        });
    }

    async function binarySearchVisualizer(arr, target) {
        clearVisualization();

        if (isSearching) return;
        isSearching = true;

        const bars = document.getElementsByClassName("bar");
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
        const speeds = {
            "1": 1000,
            "2": 500,
            "3": 100
        };
        return speeds[speedControl.value] || 500; // Default to 500 if invalid value
    }

    search.addEventListener("click", async () => {
        if (isSearching) {
            return;
        }
        let userInput = userArr.value.trim();
        let userarr = userInputFun(userInput);

        if (userarr) {
            let target = Number(targetV.value);
            if (isNaN(target) || target === "") {
                alert("Please enter a valid target element.");
                return;
            }
            displayArr(userarr);
            await binarySearchVisualizer(userarr, target);
        } else {
            alert("Please enter a valid array of numbers separated by commas before searching.");
        }
    });
});
