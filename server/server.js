var express = require ('express');
var bodyParser = require('body-parser');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require ('./models/todo');
var {Yser} = require ('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.status(200).send(doc);
      },(e) =>{
        res.status(400).send(e);
        
    });

});

app.listen(3000,()=>{
    console.log('Aplikace bezi na portu 3000');
});

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
