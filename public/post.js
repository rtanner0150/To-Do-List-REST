async function postItem(){
    let options = {
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    };
   const POST = await fetch('/', options);
   const postBody = await POST.json();
   if(POST.status != 200){
       throw Error (postBody.message);
   }
   return postBody;
}

function postList(){
    updateList().then(function(body){
        for(let i =0; i < body.length; i++){
            let node = document.createElement('li');
            document.body.appendChild(node).innerHTML = "Task Name: " + body[i].itemName + " | " + "Who's Task: " + body[i].assignee + " | " + "Importance: " + body[i].itemPriority + " | " + "Completed:" + body[i].completionStatus
        }
        console.log("Didn't think we would make it this far");
    }).catch(function(err){
    console.log(err);
    });
}