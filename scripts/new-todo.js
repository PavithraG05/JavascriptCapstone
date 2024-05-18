"use strict";

var todo = {};
window.onload= function(){
    let user_id = document.getElementById("username");
    let category = document.getElementById("category");

    getUserList(user_id);
    getCategory(category);

}

function getUserList(user_id){

    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<data.length;i++){
                console.log(`${data[i].id} ${data[i].name}`)
                let option = new Option(data[i].name, data[i].id)
                user_id.appendChild(option);
            }
            console.log("username populated");
        })
        .catch(err => {
            let msg = "Error fetching userdetails from API";
            let useridError = document.getElementById("useridError");
            useridError.innerHTML = msg;
        });
}

function getCategory(category){
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<data.length;i++){
                console.log(`${data[i].id} ${data[i].name}`)
                let option = new Option(data[i].name, data[i].id)
                category.appendChild(option);
            }
            console.log("category populated");
        })
        .catch(err => {
            let msg = "Error fetching task categories from API";
            let useridError = document.getElementById("categoryError");
            useridError.innerHTML = msg;
        });
}

function validateFields(id ,error_div){
    let todoFormValue = id.value;
    error_div.innerHTML = ``;
    id.style.border = "1px solid #dee2e6";
    if(todoFormValue != null && todoFormValue != undefined && todoFormValue != '' && todoFormValue != 0)
    {
        if(id.id === "username")
        {
            todo['userid'] = Number(`${todoFormValue}`);
            console.log(todoFormValue, todo);
        }
        else if(id.id === "category")
        {
            todo[`${id.id}`] = `${id.options[id.selectedIndex].text}`;
            console.log(`${id.options[id.selectedIndex].text}`, todo);
        }
        else{
            todo[`${id.id}`] = `${todoFormValue}`;
            console.log(todoFormValue, todo);
        }
    }
    else{
        console.log(`Enter valid ${id.id}`);
        error_div.innerHTML = `Enter valid ${id.id}`;
        id.style.border = "1px solid #dc3545";
    }
}

function validateRadio(name ,error_div){
    console.log(name);
    let flagRadio = 0;
    error_div.innerHTML = ``;
    for(let j=0; j<name.length;j++){
        if(name[j].checked === true){
            todo[`priority`] = `${name[j].value}`;
            flagRadio = 1;
            console.log(`${name[j].value}`, todo);
            break;
        }
    }
    if(flagRadio !== 1){
        console.log(`Enter valid priority`);
        error_div.innerHTML = `Enter valid priority`;
    }
}


function validateForm(){
    console.log("****Form validation Begins****");
    validateFormFields("username","useridError");
    validateFormFields("category","categoryError");
    validateFormFields("description","descriptionError");
    validateFormFields("deadline","deadlineError");
    validateFormRadio("priority","priorityError");
    console.log("****Form validated****");
}

function validateFormFields(formId, errorId){
    let todoFormElement = document.getElementById(`${formId}`);
    let todoFormValue = todoFormElement.value;
    let error_div = document.getElementById(`${errorId}`);
    error_div.innerHTML = ``;
    todoFormElement.style.border = "1px solid #dee2e6";
    if(todoFormValue != null && todoFormValue != undefined && todoFormValue != '' && todoFormValue != 0)
    {
        validateTodoObject();
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${formId}`);
        error_div.innerHTML = `Enter valid ${formId}`;
        todoFormElement.style.border = "1px solid #dc3545";
    }
}

function validateFormRadio(radioId, radioErrorId){
    let flagRadio = 0;
    let radio = document.getElementsByName(radioId);
    let error_div = document.getElementById(`${radioErrorId}`);
    error_div.innerHTML = ``;
    for(let j=0; j<radio.length;j++){
        if(radio[j].checked === true){
            flagRadio = 1;
            break;
        }
    }
    if(flagRadio !== 1){
        let error_div = document.getElementById(`${radioErrorId}`);
        console.log(`Enter valid ${radioId}`);
        error_div.innerHTML = `Enter valid ${radioId}`;
    }
}

function validateTodoObject(){
    console.log(`${Object.keys(todo).length}`);
    if(Object.keys(todo).length===5){
        console.log("****Todo created****");
        console.log(todo);
        addTodo();
        todo={};
    }
}

function addTodo(){
    fetch('http://localhost:8083/api/todos',{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(todo)
    })
    .then(response => response.json())
    .then (json => {
        //let text = `Todo task has been added successfully`;
        //console.log(text);
        //let message = document.getElementById("toast_msg");
        //message.innerHTML=text;
        //$('.toast').toast('show');
        alert('Todo has been added successfully');
    })
    .catch(err => {
        let text = `Error in adding Todo. Please Try again`;
        let message = document.getElementById("addMessage");
        message.innerHTML = text;
    });
}