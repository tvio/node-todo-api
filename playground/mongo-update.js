// const MongoClient  = require ('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb'); // vybereme pouze mongo client, to same co nahore plus dalsi


MongoClient.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Nelze se dostat na mongo server', err);
    }
    console.log('Jsem v mongu');
    //const db = client.db('todos');
    //promise - asi prepise ID
    // db.collection('todos').findOneAndUpdate({text:'tohle mam udelat'},{text:'tohle mam udelat',hotovo:true}).then((result)=>{
    //     console.log(result);
    // });
    //callback -- prepise ID
    //  db.collection('todos').findOneAndUpdate({text:'tohle mam udelat'},{text:'tohle mam udelat',hotovo:false},(err,res)=>{
    //     if (!err){
    //   console.log(res);
    //     }
    //  });

    //presID a set operator -- nastavi pouze jednu hodnotu a vrati nove hodnoty
    //     db.collection('todos').findOneAndUpdate({
    //         _id: new ObjectID('5af947039ea8cf68cf74fde9')
    //     }, {
    //             $set: {
    //                 text: 'foooho mam udelat'
    //             }
    //         }, {
    //             returnOriginal: false
    //         }).then((res)=> {
    //             console.log(res);
    // })

    // update name and increment age
    const db = client.db('users');
    db.collection('u').findOneAndUpdate({
        _id: new ObjectID("5af94d209ea8cf68cf74feec")
    }, {
            $set: { jmeno: 'Tomik' },
            $inc: { vek: 1}
        }, {
            returnOriginal: false
        }).then((res) => {
            console.log(res);
        })


    client.close();

});