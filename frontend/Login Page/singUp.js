
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9OvZ_XOo7QHjCpfo2Y9qKukBTOYA0dpg",
    authDomain: "users-data-6711e.firebaseapp.com",
    projectId: "users-data-6711e",
    storageBucket: "users-data-6711e.firebasestorage.app",
    messagingSenderId: "582857469679",
    appId: "1:582857469679:web:f6b9328eafbca02f7b351a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passInput = document.getElementById('pass');
let signUp = document.getElementById("signUp");

signUp.addEventListener('click', (event) => {
    event.preventDefault(); 
    let name = nameInput.value;
    let email = emailInput.value;
    let password = passInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            let user = userCredential.user;

            
            return set(ref(database, 'users/' + user.uid), {
                name: name,
                email: email
            });
        })
        .then(() => {
            alert('User registered successfully!');
            
            window.location.href = 'Login.html';
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
});