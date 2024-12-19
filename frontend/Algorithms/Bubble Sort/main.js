let container = document.getElementById("container")
let generate = document.getElementById("generate")
let sort = document.getElementById("sort")
let userArr = document.getElementById("userArr")
let speedControl = document.getElementById("speedControl")
let stop = document.getElementById("stop")

speedControl.value = "0"

stop.addEventListener("click",()=>{
    location.reload()
})

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

function generateArr(size = 20){
    let arr = [];
    for(let i=0;i<size;i++){
        arr.push(Math.floor(Math.random()*100)+10)
    }
    return arr;
}

function displayArr(arr){
    container.innerHTML = ""
    arr.forEach(value => {
        let bar = document.createElement("div")
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        container.appendChild(bar)
    })
}

function userInputFun(input){

    input = input.replace(/,$/, '');      

    let arr = input.split(",").map(n => +n.trim())

    if(arr.every(num => !isNaN(num))){
        return arr;
    }
    return null;
}



async function bubbleSort(arr) {
    let bars = document.getElementsByClassName("bar");

    if (isSorting) {
        return;
    }

    isSorting = true;

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {
            let bar1 = bars[j];
            let bar2 = bars[j + 1];

            bar1.style.backgroundColor = "red";
            bar2.style.backgroundColor = "red";

            await new Promise(resolve => setTimeout(resolve, speed()));

            if (arr[j] > arr[j + 1]) {
                
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                
                bar1.style.height = `${arr[j] * 3}px`;
                bar1.textContent = arr[j];
                bar2.style.height = `${arr[j + 1] * 3}px`;
                bar2.textContent = arr[j + 1];

            }

            bar1.style.backgroundColor = "#3498db";
            bar2.style.backgroundColor = "#3498db";
        }

        bars[arr.length - 1 -i ].style.backgroundColor = "green";

        if(i == arr.length-2){
            bars[0].style.backgroundColor = "green";
        }
    
    }

    isSorting = false;
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