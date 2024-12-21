        // creating queue
        let queue = []

        let a;

        // displaying messages
        function showMessage(text, isError = false) {
            clearInterval(a)
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.style.display = 'block';
            messageDiv.className = 'message ' + (isError ? 'error' : 'success');
            a = setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 4000);
        }
        
        // updating queue
        function updateDisplay() {
            const display = document.getElementById('queue-display');
            display.innerHTML = '';
            queue.forEach(item => {
                const element = document.createElement('div');
                element.className = 'queue-element';
                element.textContent = item;
                display.appendChild(element);
            });
        }
        
        // pushing elements in queue
        function enqueue() {
            const input = document.getElementById('element-input');
            const value = input.value.trim();
            
            if(!value) {
                showMessage('Please enter a value', true);
                return;
            }
            
            queue.push(value);
            updateDisplay();
            input.value = '';
            showMessage('Element enqueued successfully');
        }
        
        // removing elements from queue
        function dequeue() {
            const removed = queue.shift();
            if(!removed) {
                showMessage('Queue is empty', true);
                return;
            }
            updateDisplay();
            showMessage(`Dequeued element: ${removed}`);
        }
        
        // checking if queue is empty
        function checkEmpty() {
            const isEmpty = queue.length == 0 ? true : false;
            showMessage(`Queue is ${isEmpty ? "Empty" : "Not Empty"}`);
        }
        
        // getting front element of the queue
        function getFront() {
            const front = queue[0];
            if(!front) {
                showMessage('Queue is empty', true);
                return;
            }
            showMessage(`Front element: ${front}`);
        }
        
        // getting last element of the queue
        function getRear() {
            const rear = queue[queue.length-1];
            if(!rear) {
                showMessage('Queue is empty', true);
                return;
            }
            showMessage(`Rear element: ${rear}`);
        }
        
        // clearing queue
        function clearQueue() {
            queue = []
            updateDisplay();
            showMessage('Queue cleared');
        }