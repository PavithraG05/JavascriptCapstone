"use strict";

let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click",validateForm);
var user={};

function validateForm(){
    user={};
    console.log("****Form validation Begins****");
    validateName("name","nameError");
    validateUserName("username","usernameError");
    validatePassword("password","passwordError");
    validateConfirmPassword("confirmPassword","password","confirmPasswordError");
    console.log("****Form validated****");
}

function validateName(id, errorId){
    let nameFormElement = document.getElementById(`${id}`);
    //let type_nameFormValue = document.getElementById(`${id}`).type;
    let nameFormValue = nameFormElement.value;
    //console.log(nameFormValue ,typeof nameFormValue);
    let error_div = document.getElementById(`${errorId}`);
    //console.log(`Cleared ${id} error`);
    error_div.innerHTML = ``;
    if(nameFormValue != null && nameFormValue != undefined && nameFormValue != '' && nameFormValue != 0)
    {
        const regex = new RegExp('[a-zA-Z][a-zA-Z ]*');
        let userRegexMatch = regex.test(nameFormValue);

        if(userRegexMatch){
            user[`${id}`] = `${nameFormValue}`;
            console.log(`Name: ${nameFormValue}, ${JSON.stringify(user)}`);
        }
        else{
            let error_regex_div = document.getElementById(`${errorId}`);
            //let error_regex_msg = id.charAt(0).toUpperCase() + id.slice(1);
            error_regex_div.innerHTML = `Name must include only letters`;
            console.log(`Name must include only letters`);
        }  
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        //let error_msg = id.charAt(0).toUpperCase() + id.slice(1);
        error_div.innerHTML = `Name should not be empty`;
    }
}

function validateUserName(id, errorId){
    let usernameFormElement = document.getElementById(`${id}`);
    //let type_usernameFormValue = document.getElementById(`${id}`).type;
    let usernameFormValue = usernameFormElement.value;
    //console.log(usernameFormValue ,typeof usernameFormValue);
    let error_div = document.getElementById(`${errorId}`);
    //console.log(`Cleared ${id} error`);
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
                    let error_regex_div = document.getElementById(`${errorId}`);
                    //let error_regex_msg = id.charAt(0).toUpperCase() + id.slice(1);
                    error_regex_div.innerHTML = `Username already exists`;
                    console.log(`Username already exists`);
                }
                else{
                    user[`${id}`] = `${usernameFormValue}`;
                    console.log(`Username: ${usernameFormValue}, ${JSON.stringify(user)}`);
                }
            })
            .catch(err => {
                let text = `Error in checking username existence. Please Try again`;
                let error_regex_div = document.getElementById(`${errorId}`);
                //let error_regex_msg = id.charAt(0).toUpperCase() + id.slice(1);
                error_regex_div.innerHTML = `${text}`;
                console.log(`Error in checking username existence. Please Try again`);
            });
        }
        else{
            let error_regex_div = document.getElementById(`${errorId}`);
            //let error_regex_msg = id.charAt(0).toUpperCase() + id.slice(1);
            error_regex_div.innerHTML = `Username must contain alphanumeric characters`;
            console.log(`Username must contain alphanumeric characters`);
        }  
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        //let error_msg = id.charAt(0).toUpperCase() + id.slice(1);
        error_div.innerHTML = `Username should not be empty`;
    }
}

function validatePassword(id, errorId){
    let passwordFormElement = document.getElementById(`${id}`);
    //let type_passwordFormElement = document.getElementById(`${id}`).type;
    let passwordFormValue = passwordFormElement.value;
    //console.log(passwordFormValue ,typeof passwordFormValue);
    let error_div = document.getElementById(`${errorId}`);
    //console.log(`Cleared ${id} error`);
    error_div.innerHTML = ``;

    if(passwordFormValue != null && passwordFormValue != undefined && passwordFormValue != '' && passwordFormValue != 0)
    {
        const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+=])[A-Za-z0-9!@#$%^&*()-+=]{8,}$`);
        let passwordRegexMatch = regex.test(passwordFormValue);
        console.log(`Password: ${passwordFormValue}, ${passwordRegexMatch}`);
        if(!passwordRegexMatch){
            let error_regex_div = document.getElementById(`${errorId}`);
            //let error_regex_msg = id.charAt(0).toUpperCase() + id.slice(1);
            error_regex_div.innerHTML = `Password must be strong`;
            console.log(`Password must be strong`);
        }
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        //let error_msg = id.charAt(0).toUpperCase() + id.slice(1);
        error_div.innerHTML = `Password should not be empty`;
    }
}

function validateConfirmPassword(id, id2, errorId){
    let confirmPasswordFormElement = document.getElementById(`${id}`);
    //let type_passwordFormElement = document.getElementById(`${id}`).type;
    let confirmPasswordFormValue = confirmPasswordFormElement.value;
    //console.log(confirmPasswordFormValue ,typeof confirmPasswordFormValue);
    let error_div = document.getElementById(`${errorId}`);
    //console.log(`Cleared ${id} error`);
    error_div.innerHTML = ``;

    if(confirmPasswordFormValue != null && confirmPasswordFormValue != undefined && confirmPasswordFormValue != '' && confirmPasswordFormValue != 0)
    {
        let PassFormElement = document.getElementById(`${id2}`);
        //let type_passwordFormElement = document.getElementById(`${id}`).type;
        let PassFormValue = PassFormElement.value;
        if(PassFormValue !== confirmPasswordFormValue){
            let error_div = document.getElementById(`${errorId}`);
            console.log(`Password did not match`);
            error_div.innerHTML = `Password did not match`;
        }
        else{
            user[`${id2}`] = `${PassFormValue}`;
            console.log(`Confirm Password ${PassFormValue}, ${JSON.stringify(user)}`);
        }
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        //let error_msg = id.charAt(0).toUpperCase() + id.slice(1);
        error_div.innerHTML = `Please enter the password again`;
    }
    console.log(`length: ${Object.keys(user).length}`);
    if(Object.keys(user).length === 3){
        console.log("****Todo created****");
        console.log(user);
        addUser();
    }
}

function addUser(){
    fetch('http://localhost:8083/api/users',{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(user)
    })
    .then(response => response.json())
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