const  crypto  = require('crypto');
const hash = crypto.createHash('sha256');

const jwt = require ('jsonwebtoken');


var data = {
    id:10
};

var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123ab');
console.log('decoded', decoded);


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
