
require('./../conf/env.js')
const _ = require('lodash');
var express = require ('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require ('./db/mongoose');
var {Todo} = require ('./models/todo');
var {Yser} = require ('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc);
      },(e) =>{
        res.status(400).send(e);
        
    });

});

app.get('/todos',(req,res)=>{


    
    Todo.find().then((todos)=>{
       if (!todos){
           res.status(404).send({info:'nenalezeno',code: 'OK',datum: new Date})
       } else {
        res.send({todos,
        code: 'OK',
        datum: new Date
        
        })};
    },(e) => {
        res.status(400).send(e);
    
    });
});

app.get('/todos/:id',(req,res)=>{
    var id  = req.params.id;
 
 
 if (!ObjectID.isValid(id)){
       return res.status(404).send({info:'neni validni id',
         code: 'OK',
         datum: new Date});
  }
 
    Todo.findById(id).then((todo)=>{
     if (!todo){
         res.status(404).send({info:'nenalezeno',code: 'OK',datum: new Date})
     } else {
      res.send({todo,
      code: 'OK',
      datum: new Date
      
      })};
       
        },(e) =>{
            res.status(400).send(e);
    });
 });
 

 app.delete('/todos/:id',(req,res)=>{
    var id  = req.params.id;
 
 
 if (!ObjectID.isValid(id)){
       return res.status(404).send({info:'neni validni id',
         code: 'OK',
         datum: new Date});
  }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo){
            res.status(404).send({info:'nenalezeno',code: 'OK',datum: new Date})
        } else {
         res.send({todo,
         code: 'SMAZANO',
         datum: new Date
         
         })};
          
           },(e) =>{
               res.status(400).send(e);
       });
    });


app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','hotovo']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send({info:'neni validni id',
          code: 'OK',
          datum: new Date});      

    }

    if (_.isBoolean(body.hotovo) && body.hotovo) {
        body.hotovoDatum = new Date().getTime(); 
    } else {
        body.hotovo = false;
        body.hotovoDatum = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo)=>{
       if (!todo){
        return res.status(400).send();
       }
       res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })

});


app.listen(port,()=> console.log('ToDo appka bezi na portu 3000'));



module.exports = {app};

// //jak je to s ukoncenim spojeni?;
// newTodo.save().then((doc)=>{
//    console.log('Ulozeno',doc);
//    mongoose.disconnect();
// },(e) =>{
//     console.log('Nelze ulozit',e);
//     mongoose.disconnect();
// });


// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
//     mongoose.disconnect();
//  },(e) =>{
//      console.log('Nelze ulozit',e);
//      mongoose.disconnect();
//  });


//  Uzik.save().then((doc)=>{
//      console.log(doc);
//      mongoose.disconnect();
//     },(e)=>{        console.log(e);
//         mongoose.disconnect();
//     }
//  );
