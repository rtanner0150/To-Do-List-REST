//const is just another let
//we declare a constant variable called mongoose
//we set it equal to the return value of require('mongoose');
const mongoose = require('mongoose'); 
const { stringify } = require('querystring');

//access the connect method of the mongoose object
//pass in the localhost test database
//and some options inside of another object
mongoose.connect('mongodb+srv://WebDevAdmin:%4*6#uhE98nFRR$@mycluster.0lxio.mongodb.net/RESTfulAPI?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//make another constant variable called db
//adn we set it equal to connection property of our mongoose object
const db = mongoose.connection;

//but then we access the on and once methods of our connection property from our mongoose object
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){


});
