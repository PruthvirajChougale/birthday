const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Birthday = require('./models/birthday.js');
const bodyParser = require('body-parser');




const app=express();
const port=3000;

app.use(bodyParser.json());



let conn = mongoose.connect('mongodb://localhost:27017/birthday');

const main=require('./routes/main.js');
app.use('/', main);



app.listen(port,()=>{
    console.log('you are listening to port ', port);
})
