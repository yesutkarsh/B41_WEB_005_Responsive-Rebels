import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9OvZ_XOo7QHjCpfo2Y9qKukBTOYA0dpg",
    authDomain: "users-data-6711e.firebaseapp.com",
    projectId: "users-data-6711e",
    storageBucket: "users-data-6711e.appspot.com",
    messagingSenderId: "582857469679",
    appId: "1:582857469679:web:f6b9328eafbca02f7b351a"
};

let app = initializeApp(firebaseConfig);
let auth = getAuth(app)

let emailInput = document.getElementById("email")
let passInput = document.getElementById("pass")
let LoginBtn = document.querySelector("button")

LoginBtn.addEventListener("click",async (e)=>{
    e.preventDefault()

    let email = emailInput.value.trim();
    let password = passInput.value.trim()

    if(!email || !password){
        alert("Please Fill in all Fiels")
        return;
    }
    try {
        let userCredential = await signInWithEmailAndPassword(auth,email,password)
        let user = userCredential.user;

        alert("Login Successfull!")
    
        window.location.href = "../index.html"
    
    
    } catch (error) {
        switch(error){
            case "auth/wrong-password" : 
                 alert("Incorrect Password. Please Try Again. ")
                 break;
            case "auth/user-not-found" : 
                 alert("No Account Found With this email. Please Sign Up. ")
                 break;
            case 'auth/invalid-email':
                    alert('Please enter a valid email address.');
                    break;
            case 'auth/too-many-requests':
                    alert('Too many failed login attempts. Please try again later.');
                    break;
            default:
                    alert('Login error: ' + error.message);
            } 
            console.log(error)
        }             

    }
)