const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
//to insert user post api
// app.post('/users',(req,res)=>{
//     console.log(JSON.stringify(req.body,undefined,2));
//     var body = _.pick(req.body,['email','password','name']);
//     var user = new User(body);
//     user.insertUser().then((docs)=>{
//         res.send(docs);
//     }).catch((err)=>{
//         res.send(err)
//     });
// });

//insert new user by genrating the token for it

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['name','email','password']);
    var user = new User(body);
    user.genrateAuthToken().then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((err)=>{
        res.status(404).send(err);
    });
});

//route for get all users
app.get('/users',(req,res)=>{
    User.getAllUser().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
        res.send(docs);
    }).catch((err)=>{
        console.log(JSON.stringify(err,undefined,2));
        res.status(404).send(err);
    });
});

//route for getting user by id
app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    User.getUserById(req.params.id).then((user)=>{
        res.send(user);
    }).catch((err)=>{
        res.status(404).send(err);
    })
});

app.delete('/users',(req,res)=>{
    console.log(JSON.stringify(req.body));
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    User.removeAUser(user).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));
        res.send(result);
    }).catch((err)=>{
        console.log(JSON.stringify(err,undefined,2));
        res.send(err);
    });
});

app.listen(3000,()=>{
    console.log('App is listening at port 3000');
});

module.exports = {app} ;