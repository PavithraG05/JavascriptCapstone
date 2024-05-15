"use strict";
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

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", validateForm);
console.log("****button clicked****");
var todo = {};


function validateForm(){
    todo={};
    console.log("****Form validation Begins****");
    validateFields("username","useridError");
    validateFields("category","categoryError");
    validateFields("description","descriptionError");
    validateFields("deadline","deadlineError");
    validateRadio("priority","priorityError");
    console.log("****Form validated****");
}

function validateFields(id ,errorId){
    let todoFormElement = document.getElementById(`${id}`);
    //let type_todoFormValue = document.getElementById(`${id}`).type;
    let todoFormValue = todoFormElement.value;
    let error_div = document.getElementById(`${errorId}`);
    error_div.innerHTML = ``;

    if(todoFormValue != null && todoFormValue != undefined && todoFormValue != '' && todoFormValue != 0)
    {
        if(id === "username")
        {
            todo['userid'] = Number(`${todoFormValue}`);
            console.log(todoFormValue, todo);
        }
        else if(id === "category")
        {
            //console.log(`${todoFormElement.options[todoFormElement.selectedIndex].text}`);
            todo[`${id}`] = `${todoFormElement.options[todoFormElement.selectedIndex].text}`;
            console.log(`${todoFormElement.options[todoFormElement.selectedIndex].text}`, todo);
        }
        else{
            todo[`${id}`] = `${todoFormValue}`;
            console.log(todoFormValue, todo);
        }
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        error_div.innerHTML = `Enter valid ${id}`;
    }
}

function validateRadio(name ,errorId){
    let flagRadio = 0;
    let radio = document.getElementsByName(name);
    let error_div = document.getElementById(`${errorId}`);
    error_div.innerHTML = ``;
    for(let j=0; j<radio.length;j++){
        //console.log(radio[j]);
        if(radio[j].checked === true){
            todo[`${name}`] = `${radio[j].value}`;
            flagRadio = 1;
            console.log(`${radio[j].value}`, todo);
            break;
        }
    }
    if(flagRadio !== 1){
        //console.log("unchecked");
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${name}`);
        error_div.innerHTML = `Enter valid ${name}`;
    }
    console.log(`${Object.keys(todo).length}`);
    if(Object.keys(todo).length===5){
        console.log("****Todo created****");
        console.log(todo);
        addTodo();
        
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