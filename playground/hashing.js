//const {SHA256} = require('crypto-js');
// const CryptoJS = require('crypto-js');

// //hashing
// //console.log(SHA256('Hello Buddy!!!').toString());

// var key = '@#$%123';
// var message = 'Hello Buddy';
// //encryption
// var encryptMessage = CryptoJS.AES.encrypt(message,key);

// console.log('Original message : ',message)
// console.log('Encrypt Message : ',encryptMessage);

// //decryption

// var bytes = CryptoJS.AES.decrypt(encryptMessage.toString(),key);

// var decryptMessage = bytes.toString(CryptoJS.enc.Utf8);
// console.log('Decrypt Message : ',decryptMessage);
// console.log('Original Message : ',message)


const jwt = require('jsonwebtoken');

var user ={
    id:4,
    name:'Rajkaran',
    password:'1234'
}
var secretKey = '@#$%1';
var token = jwt.sign(JSON.stringify(user),secretKey);
var data = jwt.verify(token,secretKey);
console.log('Original Data',token);
console.log('User info');
console.log(data);


