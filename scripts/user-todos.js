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
    <span id="todo${category_name}Count" class="badge text-bg-secondary todo-count-badge"></span>
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
        <div class="card-header todo-category-header">
            <p>
                <span class="todo-category-title todo-category-color-dot" id="todo-category-${todo.id}"></span>&nbsp;&nbsp;${todo.category}&nbsp;&nbsp;
                <span class="badge" id='todo-priority-${todo.id}'>${todo.priority}</span>
                <span class="todo-icons">
                    
                    <i class="bi bi-star" id='todo-star-icon-${todo.id}'></i>
                    <i class="bi bi-pencil-square"></i>
                    <i class="bi bi-trash"></i>
                    <i class="bi" id='todo-complete-icon-${todo.id}' data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="changeStatus('todo-complete-icon-${todo.id}','${todo.id}','${todo.description}')"></i>
                </span>
            </p>
        </div>
        <div class="card-body todo-body">
            <div class="row">
                <div class="col-9">
                    <h6 class="card-title todo-desc" id='todo-desc-${todo.id}'>${todo.description}</h6>
                </div>
                <div class="col-3">
                    <a><h6 class="todo-status" id='todo-status-${todo.id}'>${todo.completed}</h6></a>
                </div>
            </div>
            <p class="card-text" id='todo-deadline-${todo.id}'><i class="bi bi-calendar3"></i>&nbsp;&nbsp;Due date: ${todo.deadline}</p>
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

    let description = document.getElementById(`todo-desc-${todo.id}`);
    console.log(description);

    let deadline = document.getElementById(`todo-deadline-${todo.id}`);
    console.log(description);    
    
    let status = document.getElementById(`todo-status-${todo.id}`);
    console.log(status); 

    let markComplete = document.getElementById(`todo-complete-icon-${todo.id}`);
    //let starred = document.getElementById(`todo-star-icon-${todo.id}`);

    //let priority_text = document.getElementById(`todo-priority-text-${todo.id}`);
    //console.log(priority_text);

    if(todo.priority === 'high' || todo.priority === 'High'){
        priority.classList.add('text-bg-danger');
        priority.textContent = "High";
        high_count ++;
    }
    else if(todo.priority === 'Medium' || todo.priority === 'medium'){
        priority.classList.add('text-bg-warning');
        priority.textContent = "Medium";
        medium_count ++;
    }
    else{
        priority.classList.add('text-bg-success');
        priority.textContent = "Low";
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

    if(todo.completed === 'Completed'){
        description.classList.add('strike');
        deadline.classList.add('strike');
        markComplete.classList.add('bi-check-circle-fill');
    }
    else{
        markComplete.classList.add('bi-check-circle');
    }

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

function changeStatus(statusId,taskid,taskDesc){
    console.log(`button clicked ${statusId} ${taskid} ${taskDesc}`);

    const statusElement = document.getElementById(statusId);
    const modal_body = document.getElementById("todo_modal_body");
    const modal_btn = document.getElementsByClassName("update_status_btn");
    
    //modal_btn[0].id = `${taskid}`;
    console.log(modal_btn[0]);

    if(statusElement.className == 'bi bi-check-circle'){
        console.log("to be marked as Completed");
        modal_body.textContent = `Are you sure you want to mark the task: '${taskDesc}' as completed?`;
        modal_btn[0].id = `pending-${taskid}`
    }
    else{
        console.log("to be marked as Pending");
        modal_body.textContent = `Are you sure you want to mark the task: '${taskDesc}' as pending?`;
        modal_btn[0].id = `completed-${taskid}`
    }

} 

function updateStatus(task_status_id){
    console.log(typeof `${task_status_id}`);
    let status_substring = `${task_status_id}`.indexOf('-');
    console.log(status_substring);
    let curr_status = `${task_status_id}`.substring(0,status_substring);
    let taskID = `${task_status_id}`.substring(status_substring+1);
    console.log(curr_status,taskID);
    let completed_status = '';
    if(curr_status === 'pending'){
        completed_status = true;
    }
    else{
        completed_status = false;
    }
    console.log(completed_status,taskID);
    
    fetch(`http://localhost:8083/api/todos/${taskID}`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body: JSON.stringify({'completed':`${completed_status}`})
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
        alert('Todo status has been updated successfully');
    })
    .catch(err => {
        let text = `Error in updating user status. Please Try again`;
        let message = document.getElementById("todoUserApiError");
        message.innerHTML = text;
    });
}