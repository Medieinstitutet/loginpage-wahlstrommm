
/*
Author: Magnus Vahlström
Date: 2021-12-04
*/

// Creating Elements
let icon = document.getElementById("icon");
let createUserContainer = document.getElementById("createUserContainer");
let logincontainer = document.getElementById("logincontainer");
let div = document.getElementById("div");
let div2 = document.getElementById("div2");
let inputValidation = document.createElement("div");
inputValidation.id="inputValidation";
let usernameInput = document.createElement("input");
let passwordInput = document.createElement("input");
let btnLogin = document.createElement("button");
let btnLogout = document.createElement("button");
let btnAdd = document.createElement("button");
let h1 = document.createElement("h1");
let h2 = document.createElement("h2");
let p1 = document.createElement("p");
let p2 = document.createElement("p");

// Setting Username input properties
usernameInput.id = "usernameInput";
usernameInput.type = "text";
usernameInput.placeholder="Användarnamn";
usernameInput.required; 

// Setting Password input properties
passwordInput.id="passwordInput";
passwordInput.type="password";
passwordInput.placeholder = "Lösenord"
passwordInput.autocomplete = "current-password";
passwordInput.required;

// Setting Button properties
btnLogout.id = "btnLogout";
btnLogin.id="btnLogin";
btnLogin.innerText = "Logga in";
btnAdd.id="btnAdd";
btnAdd.innerText = "Skapa konto!"

// Creating event listeners to buttons
btnLogin.addEventListener("click", function (e){
    login();
});
btnLogout.addEventListener("click",function(){
    logout();
});
btnAdd.addEventListener("click",function(e){
    addNewAccount();
});

//Created new inputs for new users 

//username
let addUsername = document.createElement("input");
addUsername. placeholder = "Välj ditt användarnamn";
addUsername.id = "addUsername";
addUsername.type = "text";
addUsername.required;

//Password for new users
let addPassword = document.createElement("input");
addPassword.placeholder = "Välj ditt lösenord!"
addPassword.id = "addPassword";
addPassword.type = "password"
addPassword.required

//First and Last name for new users
addName = document.createElement("input");
addName.placeholder = "Skriv ditt förnamn och efternamn!";
addName.id = "addName";
addName.type = "text";

// Append elements to divs
logincontainer.append(usernameInput,passwordInput, btnLogin);
div.append(h1);
div.append(p1);
div.append(btnLogout);
createUserContainer.append(addUsername,addPassword,addName,btnAdd);
logincontainer.append(inputValidation);
div2.append(h2);
div2.append(p2);

// Creating array to store users
let users = [];

// Creating users to put in the array
let user1 = createUser("Janne Kemi", "janne", "test");
let user2 = createUser("Kung Karl Gustaf", "kungen", "slottet");
let user3 = createUser("Göran Persson", "göran", "regeringen");

// Adding users to "database"/array 
addToDatabase(user1);
addToDatabase(user2);
addToDatabase(user3);

//Creating variables for the text!

// Start text
let hello = "Hej";
let startText = "Denna sida för att locka in kunder för att få mer innehåll. Logga in eller skapa ett gratis konto hos oss!"
// Logged in
let seeYou = "Kul att se dig igen! Hoppas du kommer gilla våran nya sida!";
let welcome = "Välkommen ";
// Logged out
let logOutbtn = "Logga ut!";
//Wrong input text
let wrongText ="Det blev fel! Om du vill skaffa ett konto kan du göra det här nere!"
let wrongInputText="Fel inmatning!";  
//lorem ipsum text only to fill out
let lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa doloremque voluptatem officia id debitis nihil ipsum, asperiores beatae quasi illo. Eius, non ea. Culpa temporibus voluptates iusto cum vitae quidem.";
let lorem2 = "Now that we know who you are, I know who I am. I’m not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain’s going to be? He’s the exact opposite of the hero. And most times they’re friends, like you and me! I should’ve known way back when… You know why, David? Because of the kids. They called me Mr Glass.";
// Method that runs when the window is loading for the first time, or when refreshing
window.onload = () => {
    if (getLocalStorage("status") == "logged in"){
        let name = getLocalStorage("name");
        viewLoggedIn(name);
    } else viewLoggedOut();
};
// Creates a object of the type: User
// @Params: 'name' = name of a user, 'username' = a name to login to the site, 'password' = the password credentials to login to the site
function createUser(name, username, password) {
    let user = {
        "name": name, 
        "username": username, 
        "password": password
    };
    
    return user;
}

//Adds to the array
function addToDatabase(user){
    users.push(user);
}

// Setting a logged-in view and greets the user
function viewLoggedIn(name){
    h1.innerText = welcome + name;
    p1.innerText = seeYou + lorem2;

    logincontainer.style.display= "none";
    createUserContainer.style.display = "none";

    btnLogout.innerText= logOutbtn;
    btnLogout.style.display = "block";
}

// Setting a logged-out view (default)
function viewLoggedOut(){
    h1.innerText = hello;
    p1.innerText = startText +lorem;

    logincontainer.style.display = "block";
    createUserContainer.style.display = "block";
    btnLogout.style.display = "none";
}

// Creates a new account (new user) to the site
function addNewAccount(){  
    let submittedName = addName.value;
    let submittedUsername = addUsername.value;
    let submittedPassword = addPassword.value;

    let newUser = createUser(submittedName, submittedUsername, submittedPassword);
    addToDatabase(newUser);

    addName.value = "";
    addUsername.value = "";
    addPassword.value = "";
    alert("Ny användare tillagd: " + newUser.name); 
}

// Function 
function login(){

    let submittedUsername = usernameInput.value;
    let submittedPassword = passwordInput.value;
    //If both inputfiled are empty:
    if(submittedUsername&&submittedPassword == null){
        inputValidation.innerText="Fel inloggningsuppgifter";
    }
    let user = getUser(submittedUsername, submittedPassword);

    if(user != null){  
        setLocalStorage(user);
        viewLoggedIn(user.name);
    } else {
        inputValidation.innerText="Fel inloggningsuppgifter";
    }
}

//Writes over the previous value
function logout(){
    window.localStorage.setItem("name", null);
    window.localStorage.setItem("username", null);
    window.localStorage.setItem("password", null);
    window.localStorage.setItem("status", null);

    h1.innerText = hello;
    p1.innerText = startText;
    btnLogout.style.display = "none";
    viewLoggedOut();
}

// Returning a user if username & password is correct
function getUser(username, password){
    for (const user of users){
        if (user.username == username && user.password == password)
            return user;
    }
    return null;
}

// Takes in a a parameter (key) and returns the value
function getLocalStorage(key){
    return window.localStorage.getItem(key);
}

//Setting key and values for the user to store at their local machine
function setLocalStorage(user){ 
    window.localStorage.setItem("name", user.name)
    window.localStorage.setItem("username", user.username);
    window.localStorage.setItem("password", "*****");
    window.localStorage.setItem("status", "logged in");
}





