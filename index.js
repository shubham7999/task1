const  express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const port = 8000;
const Chat = require("./models/user");
//database part
const mongoose = require('mongoose');

// Make a database of name newTask
mongoose.connect('mongodb://localhost/newTask');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// Server path

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// Home url
app.get('/', function (req, res) {

    return res.send("Hello !!");
 })


  //=======================================================================================================================================
 // Posting into database the message of a partciular userr
 app.post('/chatlog/addchat/:id' , async (req , res)=>{
      
    console.log(req.body);

    if (!req.body.message) return res.send(400, "Invalid message please write some message");
    if (!req.body.isSent && isSent != "True" && isSent != "False")  return res.send(400, "Invalid isSent value");


    try{

        var new_chat = new Chat({
        username : req.params.id,
        message: req.body.message,
        isSent:req.body.isSent
    })
     
    const chatid = await new_chat.save();
    res.send(200 , chatid._id);


}catch(e){
   
    console.error("this is error=>", e.message)
    res.send(500 , 'Server error');
}
     
 })

