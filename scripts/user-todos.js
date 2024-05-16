"use strict";

window.onload = function(){
    let username = document.getElementById("username");
    fetchUsername(username);
    triggerEvent();
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


function triggerEvent(){
    let username = document.getElementById("username");
    username.addEventListener("change",getUserId(username));
    console.log(username);
}

function getUserId(username){
    console.log("onchange event triggered");
    let usernameValue = username.value;
    console.log(`UserID: ${usernameValue}`);
}