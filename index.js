'use strict'; 

//dark mode functions 

document.getElementById("dark-mode").addEventListener("click", function(event) {
    console.log('moon clicked');
    let root = document.documentElement; 
    var element = document.body;
    element.classList.toggle("dark-mode");
    root.style.setProperty('--highlight', "#a2d3f1");
    root.style.setProperty('--headings', "#bf8553");
})

//product switching functions 

document.getElementById("cheddar-burger").addEventListener("click", function(event){
    let burgerImg = document.getElementById("burger-img");
    let heading = document.getElementById("burger-heading");
    let about = document.getElementById("burger-about"); 
    let price = document.getElementById("burger-price"); 

    burgerImg.src="images/dont_u_for_cheddar_bout_me.png";
    heading.innerHTML = "Don't You Four Cheddar About Me";
    about.innerHTML = "Four different cheddars in this burger"; 
    price.innerHTML = "$10.00";

})
document.getElementById("beet-burger").addEventListener("click", function(event){
    let burgerImg = document.getElementById("burger-img");
    let heading = document.getElementById("burger-heading");
    let about = document.getElementById("burger-about"); 
    let price = document.getElementById("burger-price"); 
    burgerImg.src="images/beeter_late_than_never.png";
    heading.innerHTML = "Beeter Late Than Never";
    about.innerHTML = "More beets"; 
    price.innerHTML = "$8.95";
})
document.getElementById("avocado-burger").addEventListener("click", function(event){
    let burgerImg = document.getElementById("burger-img");
    let heading = document.getElementById("burger-heading");
    let about = document.getElementById("burger-about"); 
    let price = document.getElementById("burger-price"); 
    burgerImg.src="images/sweet_home_avocado.png";
    heading.innerHTML = "Sweet Home Avocado";
    about.innerHTML = "Like your favorite movie. But with avocado"; 
    price.innerHTML = "$11.95";
})
// form functions // 

function validateForm(){
    let isValid = true; 
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let comments = document.getElementById("comments");
    let emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    let phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    let prefContact; 
    let radioButtons = document.getElementsByName("contact-options");
    //which radio button is checked 
    for (let radio of radioButtons){
        if (radio.checked){
            prefContact=radio.value;
            break;
        }
    }
    // error if name or comments are empty // 
    if (name.value === "") {
        let nameError = document.getElementById("name-error"); 
        nameError.innerHTML = "Please enter your name."
        isValid = false;
    }

    if (comments.value.trim() === ""){
        let commentsError = document.getElementById("comments-error");
        commentsError.innerHTML = "Please enter your comments."
        isValid = false;
    }
    //error if preferred contact method empty
    if (prefContact === "email"){
        let emailError = document.getElementById('email-error');
        if (email.value === ""){
            emailError.innerHTML = "Please enter an email address";
            isValid = false;
            
        }else if(!emailRegex.test(email.value)){
            console.log("email error");
            emailError.innerHTML = "Please enter a valid email address";
            isValid=false;
        }
    }else{
        let phoneErrors = document.getElementById("phone-error");
        if (phone.value === ""){
            phoneErrors.innerHTML = "Please enter a phone number"; 
            isValid=false;
            
        }else if (!phoneRegex.test(phone.value)){
            phoneErrors.innerHTML = "Please enter a valid phone number"; 
            isValid=false;
        }
    }
    return isValid;
}

// clear errors on form submit to reset 
function clearErrors(){
    console.log('clearing errors');
    document.querySelectorAll(".errors-div").forEach(errorDiv =>{
        errorDiv.innerHTML = "";
    })
}
//create customer object with form values
function createCustomer(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let comments = document.getElementById("comments").value;
    let prefContact; 
    let radioButtons = document.getElementsByName("contact-options");
    //which radio button is checked 
    for (let radio of radioButtons){
        if (radio.checked){
            prefContact=radio.value;
            break;
        }
    }
    let formCustomer = {};
    formCustomer.name = name; 
    formCustomer.email = email;
    formCustomer.phone = phone;
    formCustomer.comments = comments; 
    formCustomer.prefContact = prefContact; 
    document.getElementById("contact-form").reset(); 
    displayCustomer(formCustomer); 
}
//add div to display customer info based on submitted form 

function displayCustomer(customer){
    let customerDiv = document.getElementById("thank-you-div"); 
    let prefContact = (customer.prefContact === "email") ? customer.email : customer.phone;
    customerDiv.innerHTML =`<h4> Thank you, ${customer.name}!</h4> <br> 
        <p> We will be sure to contact you at ${prefContact}`;
}


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();
    if (!validateForm()){
    return; 
    }
    createCustomer();       
 });

 // guessing game // 

 function validateGuess(){
    let guess = document.getElementById("guess").value; 
    let isValid = true; 
    if (guess < 1 || guess > 10){
        let errorDiv = document.getElementById("guess-error"); 
        errorDiv.innerHTML = "Please enter a number from 1-10.";
        isValid=false;
    }
    return isValid; 
 }
 function guessGame(){
    let userGuess = document.getElementById("guess").value;
    let targetGuess = Math.floor(Math.random() * 10) + 1;
    let responseDiv = document.getElementById("guess-game");
    if (parseInt(userGuess) === targetGuess){
        responseDiv.innerHTML = `Congrats! You get a free burger! Your guess was ${userGuess}`;
    }else{
        responseDiv.innerHTML = `Sorry! Your guess was ${userGuess} and the number was ${targetGuess}`; 
    }
 }

 document.getElementById("guess-form").addEventListener("submit",function(event){
    event.preventDefault();
    clearErrors(); 
    if (!validateGuess()){
        return;
    }
    guessGame();

 })