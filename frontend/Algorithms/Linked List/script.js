        // HTML Elements
        const container = document.getElementById("container");
        const generateBtn = document.getElementById("generate");
        const insertBtn = document.getElementById("insert");
        const deleteBtn = document.getElementById("delete");
        const userInput = document.getElementById("userInput");
        const speedControl = document.getElementById("speedControl");
        const resetBtn = document.getElementById("stop");

        // Linked List Node
        class Node {
            constructor(value) {
                this.value = value;
                this.next = null;
            }
        }

        // Linked List Class
        class LinkedList {
            constructor() {
                this.head = null;
            }

            // Insert a new node at the end
            async insert(value) {
                if (isNaN(value)) {
                    alert("Please enter a valid number to insert.");
                    return;
                }
                let newNode = new Node(value);
                if (!this.head) {
                    this.head = newNode;
                } else {
                    let current = this.head;
                    while (current.next) {
                        current = current.next;
                    }
                    current.next = newNode;
                }
                await this.visualize();
            }

            // Delete a node by value
            async delete(value) {
                if (isNaN(value)) {
                    alert("Please enter a valid number to delete.");
                    return;
                }
                if (!this.head) return;

                // If head needs to be deleted
                if (this.head.value == value) {
                    this.head = this.head.next;
                    await this.visualize();
                    return;
                }

                // Traverse to find the node to delete
                let current = this.head;
                while (current.next && current.next.value != value) {
                    current = current.next;
                }

                if (current.next) {
                    current.next = current.next.next;
                }
                await this.visualize();
            }

            // Visualize the linked list
            async visualize() {
                container.innerHTML = "";
                let current = this.head;

                while (current) {
                    let nodeElement = document.createElement("div");
                    nodeElement.classList.add("node");
                    nodeElement.textContent = current.value;

                    let arrowElement = document.createElement("div");
                    arrowElement.classList.add("arrow");
                    arrowElement.textContent = "→";

                    container.appendChild(nodeElement);
                    if (current.next) {
                        container.appendChild(arrowElement);
                    }

                    current = current.next;
                    await new Promise(resolve => setTimeout(resolve, this.getSpeed()));
                }

                // Add NULL at the end
                let nullElement = document.createElement("div");
                nullElement.classList.add("null");
                nullElement.textContent = "NULL";
                container.appendChild(nullElement);
            }

            // Get speed value
            getSpeed() {
                let value = speedControl.value;
                if (value == "1") {
                    return 1000;
                } else if (value == "2") {
                    return 500;
                } else if (value == "3") {
                    return 100;
                }
            }
        }

        // Create LinkedList instance
        let linkedList = new LinkedList();

        // Event Listeners
        generateBtn.addEventListener("click", async () => {
            if (linkedList.head) {
                alert("Linked list already generated! Use insert or delete to modify it.");
                return;
            }

            let newArr = generateArr();
            for (let value of newArr) {
                await linkedList.insert(value);
            }
        });

        insertBtn.addEventListener("click", async () => {
            let value = parseInt(userInput.value.trim());
            if (!isNaN(value)) {
                await linkedList.insert(value);
            } else {
                alert("Please enter a valid number to insert.");
            }
            userInput.value = "";
        });

        deleteBtn.addEventListener("click", async () => {
            let value = parseInt(userInput.value.trim());
            if (!isNaN(value)) {
                await linkedList.delete(value);
            } else {
                alert("Please enter a valid number to delete.");
            }
            userInput.value = "";
        });

        resetBtn.addEventListener("click", () => {
            location.reload();
        });

        // Generate Random Array
        function generateArr(size = 5) {
            let arr = [];
            for (let i = 0; i < size; i++) {
                arr.push(Math.floor(Math.random() * 90) + 10); // Random numbers between 10 and 99
            }
            return arr;
        }