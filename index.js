'use strict'; 

//dark mode functions 

document.getElementById("dark-mode").addEventListener("click", function(event) {
    console.log('moon clicked');
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