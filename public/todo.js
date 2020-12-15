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

    async function getIndiv(id) {
        let requestOptions = {
            method: 'GET', 
            headers: {'Content-Type': 'application/json'}
        }

        const response = await fetch('/items/' + id, requestOptions);
        const body = await response.json();
        if (response.status!= 200){
            throw Error(body.message);
        }
        return body;
    }

    //this function is used for when a button is clicked and what to retrieve 
    function clickButton(){
    let listContainer = document.getElementById('myList');
    getToDoList().then(function(body){
        for(let i =0; i < body.length; i++){
            let node = document.createElement('p');
            node.setAttribute('data-id', body[i]._id);
            listContainer.appendChild(node).innerHTML = "Task Name: " + body[i].itemName + " | " + "Who's Task: " + body[i].assignee + " | " + "Importance: " + body[i].itemPriority + " | " + "Completed: " + body[i].completionStatus + ' | <a href="edit.html/update/' + body[i]._id + '">Edit</a>';
        }
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

//this is a function I am creating to be able to EDIT/PUT items within my current List 

async function editeItem(){
  let selectedItem = {
    itemName: document.getElementById('itemName').value,
    assignee: document.getElementById('assignee').value,   
    itemPriority: document.getElementById('itemPriority').value,
    completionStatus: document.getElementById('completed').value
      }
  let header = {
    method: "PUT",
    body: JSON.stringify(update),
    headers: {"Content-Type": "application/json"}
    }
    const response = await fetch('/update/' + id + header);
    if (response.status != 200){
        throw Error("We were unsuccessful with your update");
    }
    return true;
}

