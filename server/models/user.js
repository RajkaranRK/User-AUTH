const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');;

var UserSchema = new mongoose.Schema({
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
            validate:(value)=>{
                return validator.isEmail(value);
            },
            message:`{VALUE} is not an valid email`
        }
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    tokens : [{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

//use to mention which parameter return when sending response......
UserSchema.methods.toJSON = function(){
    console.log('To json method is calling');
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['name','email','tokens']);
}

//use to insert a new User
UserSchema.methods.insertUser = function(){
    var user = this;
    return new Promise((resolve,reject)=>{
        user.save().then((docs)=>{
            resolve(docs);
        }).catch((err)=>{
            var error = _.pick(err,['errmsg','op.email']);
            reject(error);
        });
    });
}

//genrate authentication token and save the user
UserSchema.methods.genrateAuthToken  = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),email:user.email,access},"@#$%1");
    user.tokens.push({access,token});
    return new Promise((resolve,reject)=>{
        user.save().then(()=>{
            resolve(token);
        }).catch((err)=>{
            reject(err);
        });
    });
}



//getting all users
UserSchema.statics.getAllUser = function(){
    var User = this;
    return new Promise((resolve,reject)=>{
        User.find().then((users)=>{
            resolve(users);
        }).catch((err)=>{
            reject(err);
        });
    });
}

//get One User by id
UserSchema.statics.getUserById = function(id){
    var User = this;
    return new Promise((resolve,reject)=>{
        User.findById(id).then((user)=>{
            if(!user)
                reject(user);
            resolve(user);
        }).catch((err)=>{
            reject(err);
        });
    });
} 

//delete a user by email and password

UserSchema.statics.removeAUser = function(user){
    var User = this;
    return new Promise((resolve,reject)=>{
        UserSchema.deleteOne(user).then((result)=>{
            if(!result)
                reject({error:'Unable to find user'});
            resolve(result);
        }).catch((err)=>{
            reject(err);
        });
    });
}
var User = mongoose.model('User',UserSchema);

module.exports = {User};