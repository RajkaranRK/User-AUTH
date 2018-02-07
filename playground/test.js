



//const request = require('request');


// var getInfo = (address)=>{
//     return new Promise((resolve,reject)=>{
//        var encodedAddress = encodeURIComponent(address);
//     request({
//         url:'',
//         json:true
//     },(err,res,body)=>{
//         console.log(JSON.stringify(body,undefined,2));
//         return body;
//     });
// });
// }

var getInfo = (address)=>{
    return new Promise((resolve,reject)=>{
        var encodedAddress  = encodeURIComponent(address);
        resolve(encodedAddress);
    });
}


getInfo('Mori gate New Delhi').then((message)=>{
    console.log('Message is '+message);
});