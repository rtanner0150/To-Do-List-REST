const url_string = window.location.href;
const url = new URL(url_string);
const itemId = url.searchParams.get("id");

//this function is used to GET with my API
async function getToDoList() {
  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("/items", requestOptions);
  const body = await response.json();
  if (response.status != 200) {
    throw Error(body.message);
  }
  return body;
}

async function getIndiv(id) {
  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch("/items/" + id, requestOptions);
  const body = await response.json();
  if (response.status != 200) {
    throw Error(body.message);
  }
  return body;
}


//this function is used for when a button is clicked and what to retrieve
function clickButton() {
  let listContainer = document.getElementById("myList");
  getToDoList()
    .then(function (body) {
      for (let i = 0; i < body.length; i++) {
        let node = document.createElement("p");
        node.setAttribute("data-id", body[i]._id);
        listContainer.appendChild(node).innerHTML =
          "Task Name: " +
          body[i].itemName +
          " <br><br><br> " +
          "Who's Task: " +
          body[i].assignee +
          " <br><br><br> " +
          "Importance: " +
          body[i].itemPriority +
          " <br><br><br> " +
          "Completed: " +
          body[i].completionStatus  + "<br>" +
          '<a id="edit" href="./edit.html?id=' +
          body[i]._id +
          '"><i class="fas fa-pen-alt fa-2x"></i></a>' + "<br>";
      }
      
      console.log("Didn't think we would make it this far");
    })
    .catch(function (err) {
      console.log(err);
    });
}
//this function is used when trying to make a POST request
async function postItem() {
  let node = {
    itemName: document.getElementById("itemName").value,
    assignee: document.getElementById("assignee").value,
    itemPriority: document.getElementById("itemPriority").value,
    completionStatus: document.getElementById("completed").value,
  };

  let requestOptions = {
    method: "POST",
    body: JSON.stringify(node),
    headers: { "Content-Type": "application/json" },
  };
  alert('Your item has been created!');
  window.location.href = 'index.html';
  const response = await fetch("/postItem", requestOptions);
  
  if (response.status != 200) {
    throw Error("Error!");
  }
  
  return node;
}

//this is a function I am creating to be able to EDIT/PUT items within my current List

async function editItem() {
  let selectedItem = {
    itemName: document.getElementById("itemName").value,
    assignee: document.getElementById("assignee").value,
    itemPriority: document.getElementById("itemPriority").value,
    completionStatus: document.getElementById("completed").value,
  };
  let header = {
    method: "PUT",
    body: JSON.stringify(selectedItem),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("/update/" + itemId, header);
  alert('Your item has been updated!');
  if (response.status != 200) {
    throw Error("We were unsuccessful with your update");
  }
  console.log("Hey, we did it!");
  window.location.href = 'index.html';
  return selectedItem;
}

//deleteing an item from list and DB
async function deleteItem() {
  let requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }

  const response = await fetch("/delete/"+ itemId  , requestOptions); 
  if (response.status != 204) {
    throw Error("Cannot delete your item from list");
  }
  window.location.href = 'index.html';
  return true;
}

//Creating my scroll to top button
mybutton = document.getElementById("myScroll");

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

