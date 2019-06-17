'user strict'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date
});

const catSchama = new Schema({
    name : String ,
    age : {
        type : Number ,
        min : 0 ,      
    } ,
    gender : {
        "enum" : ["male" , "female"] , 
        type : String 
    }, 
    color : String , 
    weight : Number , 

});

const user = mongoose.model('User' , userSchema);
const cat = mongoose.model('Cat' , catSchama);

mongoose.connect('mongodb://localhost:27017/test' , {useNewUrlParser:true}).then(() => {
  console.log('Connected successfully.');
  app.listen(process.env.PORT);
}, err => {
  console.log('Connection to db failed: ' + err);
});

app.get('/cats' , (req , res) => {
        const {gender , age , weight} = req.query;
        let find = cat.find();
        if(gender != undefined) {
            find = find.where('gender').equals(gender);
        }
        if(age != undefined){
            find = find.where('age').gte(age);
        }
        if(weight != undefined){
            find = find.where('gender').gte(weight);
        }
 
        find.then(f => {
            res.send(f);
        });
});

app.post('/cats' , (req , res )=> {
    console.log('data from http post' , req.body);
    cat.create({
        name : req.body.name , 
        age : req.body.age , 
        gender : req.body.gender,
        color : req.body.color , 
        weight : req.body.weight , 
    }).then(cat => {
        res.send(`cat ${cat.name} creaated with id: ${cat._id} age ${cat.age}`);
    });

    
    /*
    console.log('data from http post' , req.body);
    user.create({
        firstname : req.body.firstname , 
        lastname : req.body.lastname , 
        dateOfBirth : new Date(req.body.dob).getTime()
    }).then(usr => {
        res.send(`user ${usr.firstname} creaated with id: ${usr._id}`);
    });
    /*
    user.create({
        firstname: 'John' , 
        lastname: 'Doe',
        dateOfBirth: new Date('1999-03-21').getTime()
    }).then(usr => {
        res.send('user ${usr.firstname} creaated with id: ${usr._id}');
    });
    */
});

app.get('/', (req, res) => {
    res.send('Hello World from Kasuga');
});

app.get('/test', (req, res) => {
    res.send('Testing is fun');
});