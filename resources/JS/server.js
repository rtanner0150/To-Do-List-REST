const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://WebDevAdmin:124512AXEL@mycluster.0lxio.mongodb.net/to-do-list-db?retryWrites=true&w=majority'; 

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");
    //schema    
    const itemSchema = new mongoose.Schema({
        item: [{
             itemName : String,
             itemNumber : Number,
             assignee : String,
             status : Boolean
         }]
     });
    const listSchema = new mongoose.Schema({
        name : String,
        item : [itemSchema]
    });


    //
    listSchema.methods.title = function() {
        let intro;
        if (this.name){
            intro = "This is the " + this.name;
        } else {
            intro = "Please name your list";
        }
        console.log(intro);
    }
    //model
    const Tasks = mongoose.model('Tasks', listSchema);
    //documents 
    const homework= new Tasks ({name: "Homework"});
    console.log(homework.name);
    const chores = new Tasks ({name : "Chores"});

    homework.title();
    chores.title();

    //save after creating/ updating
    homework.save(function(err, task){
        if (err) return console.error(err);
        task.title();
    });
    chores.save(function(err, task){
        if (err) return console.error(err);
        task.title();
    });
    //static method- attached directly to our model/class

   Tasks.find(function(err, tasks){
        if (err) return console.error(err);
        console.log(tasks);
    })



});