const mongoose = require("mongoose");
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false, otherwise get a deprecation warning
mongoose.set("useFindAndModify", false);
const bodyParser = require("body-parser");
const mongoDB =
  "mongodb+srv://WebDevAdmin:124512AXEL@mycluster.0lxio.mongodb.net/to-do-list-db?retryWrites=true&w=majority";
var Item = require("./assets/JS/models/item.js");
var List = require("./assets/JS/models/list.js");
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    //check to see if connection worked.
    console.log("Connected to database");
  }
);
//imports the express module
const express = require("express");
//declaring the variable path and using that to serve back a HTML file later in code
const path = require("path");
const item = require("./assets/JS/models/item.js");
const { response } = require("express");

//creates a new express application
const app = express();

//allowing express to use static files in the folder name public
app.use(express.static(path.join(__dirname, "public")));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//declare the port I am wanting to connect to
const port = 3000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

//opening up our server to listen on a specific ip address and port
//ip addresses are also know as hostname or host
app.listen(port, function () {
  console.log("The server is up and running at " + port);
});

//First API call

// get homepage
// 127.0.0.1:3000/ will now retrieve the file index.html from my project

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/index.html"));
});

//get all items from my list
//127.0.0.1:3000/items
app.get("/items", function (request, response) {
  Item.find(function (err, items) {
    if (err) return console.error(err);
    response.send(items);
  });
});

app.get("/items/:id", (request, response) => {
  Item.findOne({ _id: request.params.id }).exec((err, item) => {
    if (err) return console.error(err);
    response.send(item);
  });
});

//getting all items that have the priority set to medium out of list
//127.0.0.1:3000/medium
app.get("/medium", function (request, response) {
  Item.find(
    {
      itemPriority: "Medium", // traverse through list and find an item by priority
    },
    function (err, items) {
      if (err) return console.error(err);
      response.send(items);
    }
  );
});
//creating a new item into list
app.post("/postItem", (request, res) => {
  let node = new Item(request.body);
  node.save(function (error, node) {
    if (error) {
      res.sendStatus(500);
      return console.error(error);
    }
    return node;
  });
});
//edit/updating an item from the list
app.put("/update/:id", function (req, res) {
  let updated = new Item(req.body);
  Item.findOne({ _id: req.params.id }).exec((err, item) => {
    if (err) return console.error(err);
    item.itemName = updated.itemName;
    item.itemPriority = updated.itemPriority;
    item.assignee = updated.assignee;
    item.completionStatus = updated.completionStatus;
    try {
      res.sendStatus(200);
      item.save();
     
    } catch {
      res.sendStatus(500);
    }
  });
});

//deleteing an item from list
app.delete("/delete/:id" ,
  async (request, res) => {
    try {
      await Item.deleteOne({ _id: request.params.id });
      res.sendStatus(204);
    } 
    catch { 
      console.error(err);
      res.sendStatus(404);
     
    }
  });

