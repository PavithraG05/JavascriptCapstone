
/*
function checkIfEmpty(id, errorId){
    let userFormElement = document.getElementById(`${id}`);
    let userFormValue = userFormElement.value;
    console.log(userFormValue ,typeof userFormValue);
    if(userFormValue != null && userFormValue != undefined && userFormValue != '' && userFormValue != 0)
    {
        if(Object.keys(user).length === 3){
            console.log("****User created****");
            console.log(user);
            //addUser();
        }
    }
    else{
        let error_div = document.getElementById(`${errorId}`);
        console.log(`Enter valid ${id}`);
        let error_msg = id.charAt(0).toUpperCase() + id.slice(1);
        error_div.innerHTML = `${error_msg} should not be empty`;
    }
}

console.log("Regex and add to user object")
fname.addEventListener("change",validateName(fname.value, "nameError"));

function validateName(fnameValue, errorId){

    console.log(fnameValue);
    const regex = new RegExp('[a-zA-Z][a-zA-Z ]*');
    let userRegexMatch = regex.test(fnameValue);
    if(userRegexMatch){
        user[`${id}`] = `${fnameValue}`;
        console.log(fnameValue, user);
    }
    else{
        let error_regex_div = document.getElementById(`${errorId}`);
        let error_regex_msg = fnameValue.charAt(0).toUpperCase() + fnameValue.slice(1);
        error_regex_div.innerHTML = `${error_regex_msg} should only contain letters`;
        console.log(`${error_regex_msg} should only contain letters`);
    }
   
}
*/

/*
console.log("Error block clear")
let fname = document.getElementById("name");
fname.addEventListener("blur",removeError("nameError"));

function removeError(errorId){
    let error_div = document.getElementById(`${errorId}`);
    error_div.innerHTML = ``;
    console.log("****Cleared Name Error message****")
}

<span id='todo-priority-text-${todo.id}'></span>
<i class="bi bi-exclamation-triangle-fill" id='todo-priority-${todo.id}'></i>&nbsp;
priority.classList.add('text-danger','border','border-danger');
*/


console.log(JSON.stringify({'completed':false}));