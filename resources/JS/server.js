const mongoose = require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false, otherwise get a deprecation warning
mongoose.set('useFindAndModify', false);
const mongoDB = 'mongodb+srv://WebDevAdmin:124512AXEL@mycluster.0lxio.mongodb.net/to-do-list-db?retryWrites=true&w=majority'; 
var Item = require('./models/item.js');
var List = require('./models/list.js');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    //check to see if connection worked. 
    console.log('Connected to database'); 
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', function(){


    //I am creating a new item using the item model from item.js
    let item1 = new Item({
        itemName        : "Homework",
        itemPriority    : "High",
        assignee        : "Jepharie",
        completionStatus: true
    
    });
    //saving item1 and using a callback to error check

    item1.save(function(err, item){
        if (err) return console.error(err);
        console.log(item);
    });
    //creating another item to add into the exisiting list named School. 
    let item2 = new Item(
        {
          itemName: "DB Work",
          itemPriority: "Medium",
          assignee: "Jepharie",
          completionStatus: false
      }
      );
      //saving item2 and error checking if no error logging that item
      item2.save(function(err, item){
        if (err) return console.error(err);
        console.log(item);
    });
    //creating another item to add into the exisiting list named School. 
    let item3 = new Item(
        {
          itemName: "Capstone",
          itemPriority: "High",
          assignee: "Jepharie",
          completionStatus: false
      }
      );
      item3.save(function(err, item){
        if (err) return console.error(err);
        console.log(item);
    });
  
    
    var myList = new List({
        name: "School",
        items : [
                {
                    item : item1._id                 
                },
                { item : item2._id
                },
                { item : item3._id }
            ],
    });

    myList.save(); //add callback to error check if needed 
    /*shorthand save*/

});
// Add CRUD operations to the to-do-list db
//traversing by priority
Item.find({
        itemPriority: "Medium" // traverse through list and find an item by priority
    }, function(err, items){
        if (err) return console.error(err);
        console.log(items)
    });

//updating one item inside the list School with completion status from false to true
    Item.findOneAndUpdate({
        itemName: "DB Work"
        },
        {
            completionStatus: true
        }, function(err, item){
            if (err) return console.error(err);
            
            console.log('newItem')
            console.log(item)
        });


//removing the item Homework from the list School
Item.remove({
        itemName: "Homework"
}, function(err, item){
    console.log(item)
}
);

