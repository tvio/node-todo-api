const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

// smaze vse
// Todo.remove({}).then((result)=>{
//     console.log(result);
// })

// vrati remuvnuty dokument
Todo.findOneAndRemove({_id:"5b0492e40cb256cdfc7b2142"}).then((result)=>{
    console.log(result);
});