// const MongoClient  = require ('mongodb').MongoClient;
const {MongoClient,ObjectID}  = require ('mongodb'); // vybereme pouze mongo client, to same co nahore plus dalsi


MongoClient.connect('mongodb://localhost:27017/todos',(err,client)=>{
    if (err){
        console.log('Nelze se dostat na mongo server',err);
    }
    console.log('Jsem v mongu');
    
    const db = client.db('todos');
    
    db.collection('todos').insertOne({
    text: 'Neco musim udelat5',
    hotovo: true
    },(err,result)=>{
        if (err){
            return console.log('Nelze vlozit zaznam',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    })


    // const db = client.db('Users');
    // db.collection('Uzivatele').insertOne({
    //     jmeno:'Tomik',
    //     vek : 77,
    //     lokalita: 'Brno'
    // },(err,result)=>{
    //      if(!err){
    //          console.log(JSON.stringify(result.ops,undefined,2));
    //          console.log(result.ops[0]._id.getTimestamp());
    //      }  else {
    //          console.log(err);
    //      }
    // });



    client.close();
});
