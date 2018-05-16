const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

// je to slozenina asi hec cislo, nelze zadavat nic jeneho nez a-h 0-9
var id = "5afc35bb61dbcd14bc95131d";

if (!ObjectID.isValid(id)) {
    console.log('ID neni validni');
}


//mongose 5 musi mit catch, ve videu je reseni bez reseni chyb pomoc if(!todo){ return {nenasel jsem}}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todo hledej napr podle id',todos);
    
// }).catch((err)=>{
//    console.log(e);
// });

// Todo.findOne({
//     hotovo:false
// }).then((todo)=>{
//         console.log('Todo prvni , ostatni nenacte',todo);
  
// }).catch((err)=>{
//     console.log(e);

//  });
 

Todo.findById(id).then((todo)=>{
    if (!todo){
        return console.log('Nenasel jsem id');
    }
    
    console.log('Tohle je hledani pouze podle ID',todo);

}).catch((err)=>{
    console.log(err);

 });

//  User.findById(id).then((user)=>{
//      if(!user){
//          return console.log('Nenasel jsem uzika');
//      }
//      console.log(JSON.stringify(user),undefined,2);
//     }, (e) => {
//         console.log(e);
//     });

