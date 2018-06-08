const  crypto  = require('crypto');
const hash = crypto.createHash('sha256');
const bcrypt  = require ('bcryptjs');
const jwt = require ('jsonwebtoken');


var password = '123abc';

bcrypt.genSalt(10,(err,salt)=>{
   bcrypt.hash(password,salt,(err,hash)=>{
       console.log(hash);
   });
});
//pridano m na zacatek hashe
var hashedPassword = 'm$2a$10$uC03F57Jd0QjCxVnxdERReWLH1xTQdA9TgFKzIKtOycj55ErMe3qq';

bcrypt.compare(password,hashedPassword).then((res)=>{
   console.log(res);
});

// var data = {
//     id:10
// };

// var token = jwt.sign(data,'123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123ab');
// console.log('decoded', decoded);



// var message = 'hoj';



// hash.setEncoding('hex');
// hash.write(message);
// hash.end();
// var hashData = hash.read();

// console.log(`Message>>${message}`);
// console.log(`Hash>>${hashData}`);

// var data = {
//     id: 4
// };
// var hashv2 = crypto.createHash('sha256').update(JSON.stringify(data)+ 'someSecret').digest('hex');
// var token = {
//     data,
//     hash:hashv2
// };
// console.log(token);

// //man in th middle
// token.data.id=5;
// token.hash = crypto.createHash('sha256').update(JSON.stringify(token.data)).digest('hex');

// // zjistime, jestli nekdo nezmenil data
// var resultHash = crypto.createHash('sha256').update(JSON.stringify(token.data)+ 'someSecret').digest('hex');

// if (resultHash === token.hash){
//     console.log('data se nezmenila');
//  } else {
//         console.log('nekdo zmenil data');
//     }
