//this function is used to GET with my API
async function getToDoList(){
    let requestOptions = {
    method: "GET",
    headers: {"Content-Type": "application/json"}
    }
    
    const response = await fetch("/items", requestOptions);
    const body = await response.json();
    if(response.status != 200){
        throw Error(body.message);
    }
    return body;
    
    }
    //this function is used for when a button is clicked and what to retrieve 
    function clickButton(){
    getToDoList().then(function(body){
        for(let i =0; i < body.length; i++){
            let node = document.createElement('li');
            document.body.appendChild(node).innerHTML = "Task Name: " + body[i].itemName + " | " + "Who's Task: " + body[i].assignee + " | " + "Importance: " + body[i].itemPriority + " | " + "Completed:" + body[i].completionStatus
        }
        // let myObjs = JSON.stringify(body);
        // document.body.append(myObjs);
    console.log("Didn't think we would make it this far");
    }).catch(function(err){
    console.log(err);
    });
}
//this function is used when trying to make a POST request 
async function postItem(){
    let node =  { 
        itemName: document.getElementById('itemName').value,
        assignee: document.getElementById('assignee').value,   
        itemPriority: document.getElementById('itemPriority').value,
        completionStatus: document.getElementById('completed').value
      }
            
    let requestOptions = {
    method: "POST",
    body: JSON.stringify(node),
    headers : { "Content-Type": "application/json"}
    }

    const response = await fetch("/postItem", requestOptions);
    if(response.status != 200){
    throw Error("Error!");
    }
    return node;
}


