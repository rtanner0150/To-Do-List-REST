const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://WebDevAdmin:124512AXEL@mycluster.0lxio.mongodb.net/to-do-list-db?retryWrites=true&w=majority'; 
var Items = required('/resources/JS/models/item.js');
var Lists = required('/resources/JS/models/list.js');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    //check to see if connection worked. 
    console.log('Connected to database'); 
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', function(){


    //I am creating a new item using the item model from item.js
    let item1 = new Items({
        itemName        : "Homework",
        itemPriority    : "High",
        assignee        : "Jeff",
        completionStatus: true
    
    });
    //saving item1 and using a callback to error check

    item1.save(function(err, item){
        if (err) return console.error(err);
        console.log(item);
    });
    
    var myList = new Lists({
        name: "School",
        items : [
                {
                    item : item1_id
                }
            ],
    });

    myList.save(); //add callback to error check if needed 
    /*shorthand save*/

});
