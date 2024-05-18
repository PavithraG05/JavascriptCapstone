"use strict";

var user={};

function validateName(id, error_div){
    let nameFormValue = id.value;
    id.style.border = "1px solid #dee2e6";
    error_div.innerHTML = ``;
    if(nameFormValue != null && nameFormValue != undefined && nameFormValue != '' && nameFormValue != 0)
    {
        const regex = new RegExp('[a-zA-Z][a-zA-Z ]*');
        let userRegexMatch = regex.test(nameFormValue);

        if(userRegexMatch){
            user['name'] = `${nameFormValue}`;
            console.log(`Name: ${nameFormValue}, ${JSON.stringify(user)}`);
        }
        else{
            error_div.innerHTML = `Name must include only letters`;
            id.style.border = "1px solid #dc3545";
            console.log(`Name must include only letters (a-zA-Z)`);
        }  
    }
    else{
        console.log(`Enter valid ${id}`);
        id.style.border = "1px solid #dc3545";
        error_div.innerHTML = `Name should not be empty`;
    }
}

function validateUserName(id, error_div){
    let usernameFormValue = id.value;
    id.style.border = "1px solid #dee2e6";
    error_div.innerHTML = ``;

    if(usernameFormValue != null && usernameFormValue != undefined && usernameFormValue != '' && usernameFormValue != 0)
    {
        const regex = new RegExp('^(?=.*[a-zA-Z])[a-zA-Z][a-zA-Z0-9]{5,}$');
        let usernameRegexMatch = regex.test(usernameFormValue);

        if(usernameRegexMatch){

            fetch(`http://localhost:8083/api/username_available/${usernameFormValue}`,{
                method:"GET"
            })
            .then(response => response.json())
            .then(data => {
                if(!data.available){
                    error_div.innerHTML = `Username already exists`;
                    id.style.border = "1px solid #dc3545";
                    console.log(`Username already exists`);
                }
                else{
                    user['username'] = `${usernameFormValue}`;
                    console.log(`Username: ${usernameFormValue}, ${JSON.stringify(user)}`);
                }
            })
            .catch(err => {
                let text = `Error in checking username existence. Please Try again`;
                error_div.innerHTML = `${text}`;
                id.style.border = "1px solid #dc3545";
                console.log(`Error in checking username existence. Please Try again`);
            });
        }
        else{
            error_div.innerHTML = `Username must contain alphanumeric characters only`;
            id.style.border = "1px solid #dc3545";
            console.log(`Username must contain alphanumeric characters only`);
        }  
    }
    else{
        
        console.log(`Enter valid ${id}`);
        error_div.innerHTML = `Username should not be empty`;
        id.style.border = "1px solid #dc3545";
    }
}

function validatePassword(id, error_div){
    
    let passwordFormValue = id.value;
    id.style.border = "1px solid #dee2e6";
    error_div.innerHTML = ``;

    if(passwordFormValue != null && passwordFormValue != undefined && passwordFormValue != '' && passwordFormValue != 0)
    {
        const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{8,}$`);
        let passwordRegexMatch = regex.test(passwordFormValue);
        console.log(`Password: ${passwordFormValue}, ${passwordRegexMatch}`);
        if(!passwordRegexMatch){
            error_div.innerHTML = `Password must be strong`;
            id.style.border = "1px solid #dc3545";
            console.log(`Password must be strong`);
        }
    }
    else{
        console.log(`Enter valid ${id}`);
        error_div.innerHTML = `Password should not be empty`;
        id.style.border = "1px solid #dc3545";
    }
}

function validateConfirmPassword(id, id2, error_div){
    
    let confirmPasswordFormValue = id.value;
    id.style.border = "1px solid #dee2e6";
    error_div.innerHTML = ``;

    if(confirmPasswordFormValue != null && confirmPasswordFormValue != undefined && confirmPasswordFormValue != '' && confirmPasswordFormValue != 0)
    {
        let PassFormValue = id2.value;
        if(PassFormValue !== confirmPasswordFormValue){
           console.log(`Password did not match`);
            error_div.innerHTML = `Password did not match`;
            id.style.border = "1px solid #dc3545";
        }
        else{
            user['password'] = `${PassFormValue}`;
            console.log(`Confirm Password ${PassFormValue}, ${JSON.stringify(user)}`);
        }
    }
    else{
        console.log(`Enter valid ${id}`);
        error_div.innerHTML = `Please enter the password again`;
        id.style.border = "1px solid #dc3545";
    }
}

function hideShowPassword(password){
    if(password.type === 'password'){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}

function validateFormField(){
    console.log(user);
    validateField("fname","nameError");
    validateField("username","usernameError");
    validateField("password","passwordError");
    validateField("confirmPassword","confirmPasswordError");
}

function validateField(fieldId, fieldErrorId){
    
    let fieldElement = document.getElementById(fieldId)
    let fieldValue = fieldElement.value;
    let fieldErrorDiv = document.getElementById(fieldErrorId);
    if(fieldValue != null && fieldValue != undefined && fieldValue != '' && fieldValue != 0)
    {
        validateUserObject();
    }
    else{
        if(fieldId === "fname"){
            fieldElement.style.border = "1px solid #dc3545";
            fieldErrorDiv.innerHTML = `Name should not be empty`;
        }
        else{
            fieldElement.style.border = "1px solid #dc3545";
            let error_msg = fieldId.charAt(0).toUpperCase() + fieldId.slice(1);
            fieldErrorDiv.innerHTML = `${error_msg} should not be empty`;
        }
    }
    
}

function validateUserObject(){
    console.log(`length: ${Object.keys(user).length}`);
    if(Object.keys(user).length === 3){
        console.log("****User created****");
        console.log(user);
        addUser();
        user={};
    }
}

function addUser(){
    fetch('http://localhost:8083/api/users',{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(user)
    })
    .then(response => {
        response.json();
    })
    .then (json => {
        //let text = `Todo task has been added successfully`;
        //console.log(text);
        //let message = document.getElementById("toast_msg");
        //message.innerHTML=text;
        //$('.toast').toast('show');
        alert('User has been added successfully');
    })
    .catch(err => {
        let text = `Error in adding User. Please Try again`;
        let message = document.getElementById("addRegisterMessage");
        message.innerHTML = text;
    });
}

