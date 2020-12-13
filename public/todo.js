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

async function postItem(){
    let node =  { 
        itemName: document.getElementsByClassName('itemName').value,
        itemPriority: document.getElementsByClassName('itemPriority').value,
        assignee: document.getElementsByClassName('assignee').value     
      }
            
    let reqOptions = {
    method: "POST",
    body: JSON.stringify(node),
    headers : { "Content-Type": "application/json"}
    }

    const response = await fetch("/items", reqOptions);
    if(response.status != 200){
    throw Error("Error!");
    }
    
    return true;
}

