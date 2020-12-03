//creating an interface to the mongoose module
const mongoose = require('mongoose');
//Creating a golbal const to refer to schemas
const Schema = mongoose.Schema;

//list schema or blueprint
const listSchema = new Schema({
    name : {type:String, required: true},
    //referencing the itemSchema from item.js 
    items : [ 
        {
        item: {type: Schema.Types.ObjectId, ref : "Item"  }
        } 
    ],
});
module.exports = mongoose.model("List", listSchema);