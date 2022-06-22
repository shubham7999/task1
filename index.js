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


