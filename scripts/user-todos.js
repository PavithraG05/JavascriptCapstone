"use strict";

var completed_count = 0;
var pending_count = 0;
var high_count = 0;
var medium_count = 0;
var low_count = 0;
var personal_count = 0;
var household_count =0;
var financial_count = 0;
var work_count = 0;
var errand_count = 0;
var help_count = 0;

window.onload = function(){
    let username = document.getElementById("username");
    fetchUsername(username);
    fetchCategories();
    //triggerEvent();
}

function fetchUsername(username){

    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<data.length;i++){
                console.log(`${data[i].id} ${data[i].name}`)
                let option = new Option(data[i].name, data[i].id)
                username.appendChild(option);
            }
            console.log("username populated");
        })
        .catch(err => {
            let msg = "Error fetching userdetails from API";
            let useridError = document.getElementById("todoUserApiError");
            useridError.innerHTML = msg;
        });
}

function fetchCategories(){
    let category_list = document.getElementById("todo-allCategory");
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(data => {
            for(let i=0;i<data.length;i++){
                console.log(`${data[i].id} ${data[i].name}`)
                createList(data[i].name);
            }
            console.log("category populated");
        })
        .catch(err => {
            let msg = "Error fetching task categories from API";
            let categoryError = document.getElementById("category_listerror");
            categoryError.innerHTML = msg;
        });
}

/*
function triggerEvent(){
    let username = document.getElementById("username");
    username.addEventListener("change",getUserId(username));
    console.log(username);
}
*/
function getUserId(username){
    completed_count = 0;
    pending_count = 0;
    high_count = 0;
    medium_count = 0;
    low_count = 0;
    personal_count = 0;
    household_count =0;
    financial_count = 0;
    work_count = 0;
    errand_count = 0;
    help_count = 0;

    console.log("onchange event triggered");
    let usernameValue = username.value;
    console.log(`UserID: ${usernameValue}`);
    let useridError = document.getElementById("todoUserApiError");
    useridError.innerHTML = '';
    username.style.border = "1px solid #dee2e6";
    if(usernameValue != null && usernameValue != undefined && usernameValue != '' && usernameValue != 0){
        getTodos(usernameValue);
    }
    else{
        let msg = " Select valid username to display todo tasks";
        useridError.innerHTML = msg;
        username.style.border = "1px solid #dc3545";
    }
}

function getTodos(usernameValue){
    fetch(`http://localhost:8083/api/todos/byuser/${usernameValue}`)
        .then(response => response.json())
        .then(data => {
            //console.log(`${data}`);
            let todoCard = document.getElementById("todo-cards");
            todoCard.innerHTML = '';
            for(let i=0;i<data.length;i++){
                console.log(`UserID ${data[i].userid}Category ${data[i].category} description ${data[i].description} Deadline ${data[i].deadline} Priority${data[i].priority} Completed${data[i].completed}`)
                createcard(data[i]);
            }
            console.log("todos populated");
        })
        .catch(err => {
            let msg = "Error fetching todos from API";
            let useridError = document.getElementById("todoUserApiError");
            useridError.innerHTML = msg;
        });
}

function createList(categoryName){

    const allCategoryList = document.getElementById("todo-allCategory");
    let category_name = categoryName.replace(/\s/g, "");
    const categoryListContent = 
    `<li id="todo-Category-list-${category_name}" class="todo-aside-sublist ">
    <i class="bi bi-circle-fill" id="circle-${category_name}"></i>&nbsp;${categoryName} &nbsp;&nbsp;
    <span>
    <span id="todo${category_name}Count"></span>
    </span>
    </li>
    `
    allCategoryList.innerHTML += categoryListContent;
    const categoryCircle = document.getElementById(`circle-${category_name}`)
    if(categoryName === "Personal Task"){
        categoryCircle.classList.add('text-primary');
    }
    else if(categoryName === "Household Task"){
        categoryCircle.classList.add('text-warning');
    }
    else if(categoryName === "Financial Task"){
        categoryCircle.classList.add('text-danger');
    }
    else if(categoryName === "Help Others"){
        categoryCircle.classList.add('text-dark');
    }
    else if(categoryName === "Errand"){
        categoryCircle.classList.add('text-info');
    }
    else{
        categoryCircle.classList.add('text-success');
    }
}

function createcard(todo){
    let todoCard = document.getElementById("todo-cards");
    //todoCard.innerHTML = '';
    //let category = document.getElementById("todo-category");
    //let priority = document.getElementById("todo-priority");

    if(todo.completed){
        todo.completed = "Completed";
        completed_count ++;
        console.log(`Change to completed ${completed_count}`);
    }
    else{
        todo.completed = "Pending";
        pending_count ++;
        console.log(`Change to Pending ${pending_count}`);
    }
    const content = 
    `<div class="card todo-card">
        <div class="card-header todo-category-title">
            <p>
                <span class="todo-category-color-dot" id="todo-category-${todo.id}"></span>&nbsp;&nbsp;${todo.category}
                <span class="todo-icons">
                    <i class="bi bi-exclamation-triangle-fill" id='todo-priority-${todo.id}'></i>&nbsp;
                    <span id='todo-priority-text-${todo.id}'></span>
                </span>
            </p>
        </div>
        <div class="card-body todo-body">
            <div class="row">
                <div class="col-9">
                    <h6 class="card-title todo-desc">${todo.description}</h6>
                </div>
                <div class="col-3">
                    <h6 class="todo-status">${todo.completed}</h6>
                </div>
            </div>
            <p class="card-text"><i class="bi bi-calendar3"></i>&nbsp;&nbsp;Due date: ${todo.deadline}</p>
        </div>
    </div>`
    todoCard.innerHTML += content;
    addClass(todo);
}

function addClass(todo){
    let category = document.getElementById(`todo-category-${todo.id}`);
    console.log(category);
    
    let priority = document.getElementById(`todo-priority-${todo.id}`);
    console.log(priority);
    
    let priority_text = document.getElementById(`todo-priority-text-${todo.id}`);
    console.log(priority_text);

    if(todo.priority === 'high' || todo.priority === 'High'){
        priority.classList.add('text-danger');
        priority_text.textContent = "High";
        high_count ++;
    }
    else if(todo.priority === 'Medium' || todo.priority === 'medium'){
        priority.classList.add('text-warning');
        priority_text.textContent = "Medium";
        medium_count ++;
    }
    else{
        priority.classList.add('text-success');
        priority_text.textContent = "Low";
        low_count ++;
    }
    console.log(priority);
    if(todo.category === "Personal Task"){
        category.classList.add('bg-primary');
        personal_count ++;
    }
    else if(todo.category === "Household Task"){
        category.classList.add('bg-warning');
        household_count ++;
    }
    else if(todo.category === "Financial Task"){
        category.classList.add('bg-danger');
        financial_count ++;
    }
    else if(todo.category === "Help Others"){
        category.classList.add('bg-dark');
        help_count ++;
    }
    else if(todo.category === "Errand"){
        category.classList.add('bg-info');
        errand_count ++;
    }
    else{
        category.classList.add('bg-success');
        work_count ++;
    }
    console.log(category);
    addCount();
}

function addCount(){
    const highId = document.getElementById("todo-high-count");
    highId.textContent = high_count;

    const mediumId = document.getElementById("todo-medium-count");
    mediumId.textContent = medium_count;

    const lowId = document.getElementById("todo-low-count");
    lowId.textContent = low_count;

    const completedId = document.getElementById("todo-completed-count");
    completedId.textContent = completed_count;

    const pendingId = document.getElementById("todo-pending-count");
    pendingId.textContent = pending_count;

    const personaltaskId = document.getElementById("todoPersonalTaskCount");
    personaltaskId.textContent = personal_count;

    const worktaskId = document.getElementById("todoWorkTaskCount");
    worktaskId.textContent = work_count;

    const errandtaskId = document.getElementById("todoErrandCount");
    errandtaskId.textContent = errand_count;

    const helptaskId = document.getElementById("todoHelpOthersCount");
    helptaskId.textContent = help_count;

    const financetaskId = document.getElementById("todoFinancialTaskCount");
    financetaskId.textContent = financial_count;

    const housetaskId = document.getElementById("todoHouseholdTaskCount");
    housetaskId.textContent = household_count;

    const alltaskId = document.getElementById("todo-alltask-count");
    alltaskId.textContent = personal_count+work_count+errand_count+help_count+financial_count+household_count;
}