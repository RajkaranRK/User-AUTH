
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{

const db = client.db('MyData');
const User = db.collection('User');
User.insertOne({name:'Rajkaran',age:20,post:'Software-Developer'},(err,result)=>{
    if(err){
        console.log('Error',err)
    }
    else{
        console.log('Response')
        console.log(JSON.stringify(result));
    }
});

User.find({}).toArray((err,docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
});
client.close();
});