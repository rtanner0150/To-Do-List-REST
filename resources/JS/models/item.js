//creating an interface to the mongoose module
const mongoose = require('mongoose');

//Creating a golbal const to refer to schemas
const Schema = mongoose.Schema;

//item schema or blueprint
const itemSchema = new Schema({
    itemName        : {type:String, required: true},
    itemPriority    : {type: String, enum: ['High', 'Medium', 'Low']},
    assignee        : {type:String, required: true},
    completionStatus: Boolean
    
    }, 
        {
    timeStamps : true
        }
    );
    module.exports = mongoose.model("Item", itemSchema);