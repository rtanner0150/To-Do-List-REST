//imports the express module
const express = require('express');

//creates a new express application
const app = express();

//declare the port I am wanting to connect to
const port = 3000;

//opening up our server to listen on a specific ip address and port
//ip addresses are also know as hostname or host
app.listen(port, function(){
    console.log('The server is up and running at ' + port);
});

//First API call

//127.0.0.1:3000/
app.get('/', function(request, response){
    console.log(request);
    response.send("Welcome back!\n");
   });

   //creating a new directory to add to the host with the pathing being /name
   //127.0.0.1:3000/name 
app.get('/name', function(request, response){
    response.send('Jepharie'); 
});
