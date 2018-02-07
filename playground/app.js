const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');


mongoose.connect('mongodb://localhost:27017/Jokar');

var UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    email:{
        type:String,
        required:true,
        minlength:3,
        unique:true,
        trim:true,
        validator :{
            validate:validator.isEmail,
            message:'{VALUE} is not an valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    }
});

UserSchema.methods.toJSON = function(){
    console.log('To json method is calling');
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['name','email']);
}

UserSchema.methods.insertUser = function(){
    var user = this;
    return new Promise((resolve,reject)=>{
        user.save().then((docs)=>{
            resolve(docs);
        }).catch((err)=>{
            reject(err);
        });
    });
}

var User = mongoose.model('User',UserSchema);

module.exports = {User};