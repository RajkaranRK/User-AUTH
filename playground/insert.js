const User = require('./app.js').User;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
//insert new User


var app = express();
app.use(bodyParser.json());

app.post('/users',(req,res)=>{
    console.log(JSON.stringify(req.body,undefined,2));
    var body = _.pick(req.body,['email','name','password']);
    var user = new User(body);
    user.insertUser().then((user)=>{
        console.log(JSON.stringify(user,undefined,2));
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    });
});

app.listen(3000,()=>{
    console.log('App is listening at port 3000');
});

// var user = new User({
//     name:'Rajkaran',
//     email:'rajkaranr64@gmail.com',
//     password:'2dsdsdsdsds'
// });

// user.insertUser().then((res)=>{
//     console.log(JSON.stringify(user,undefined,2));
// }).catch((err)=>{
//     console.log(JSON.stringify(err,undefined,2));
// });
