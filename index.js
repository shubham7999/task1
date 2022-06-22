const  express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const port = 8000;
const Chat = require("./models/user");
//database part
const mongoose = require('mongoose');

// Make a database of name newTask
mongoose.connect('mongodb://localhost/Task1');

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


  //===================================================================================================================================
 // Getting a chatlog of a particular user by id
 app.get('/chatlog/getchat/:id' , async (req , res)=>{
      

    if(!req.params.id) res.send(400 , "Send the correct user Id !!");

    try{

   const chats =  await Chat.find({username : req.params.id}, null , {limit : 10}).sort({updatedAt:-1 });
   console.log(chats);
   res.json(200 , chats);


}catch(e){
   
    console.error("this is error=>", e.message)
    res.send(500 , 'Server error');
}
     
})



//===========================================================================================================================================

// deleting all the chatlogs of a given user
app.delete('/chatlog/delete/:id' , async (req , res)=>{
      

    if(!req.params.id) res.send(400 , "Send the correct user Id !!");

    try{
    
    console.log(req.params.id);
    await Chat.deleteMany({username : req.params.id});
    res.json(200 , `Chatlog deleted successfully of user ${req.params.id}`);


}catch(e){
   
    console.error("this is error=>", e.message)
    res.send(500 , 'Server error');
}
     
})



// Delete particular chat of a particular user
//===========================================================================================================================================
app.delete('/chatlog/delete/:userid/:messageid' , async (req , res)=>{
      

    if(!req.params.userid)    res.send(400 , "Send the correct user id !!");
    if(!req.params.messageid) res.send(400 , "Send the correct message id !!");


    try{
    
    const isthere = await Chat.findById(req.params.id);
    if(!isthere){

         console.log(isthere);
         return res.send(400 , `Please enter correct id of message!!`);
    }

    await Chat.findByIdAndDelete(req.params.messageid);
    res.send(200 , `Message deleted successfully of user ${req.params.userid}`);


}catch(e){
   
    console.error("this is error=>", e.message)
    res.send(500 , 'Server error');
}
     
})



