// const MongoClient  = require ('mongodb').MongoClient;
const {MongoClient,ObjectID}  = require ('mongodb'); // vybereme pouze mongo client, to same co nahore plus dalsi


MongoClient.connect('mongodb://localhost:27017/todos',(err,client)=>{
    if (err){
        console.log('Nelze se dostat na mongo server',err);
    }
    console.log('Jsem v mongu');
    const db = client.db('todos');

//-- find {hotovo:true}
// db.collection('Todos').find({_id: new ObjectID('5af6efcc9f2c491090a86653')}).toArray((err,results)=>{
 db.collection('todos').find({hotovo:false}).toArray((err,results)=>{
  
           console.log('Todos');

        if (err)  {
            console.log('Nelze nacist', err);}
        console.log(JSON.stringify(results,undefined,2));     
        
        

//     client.close();
//         });
    
// });

//   db.collection('Todos').find().count().then((count)=>{
//         console.log('Todos');

//         if (err)  {
//             console.log('Nelze nacist', err);}
//         console.log(`Celkovy pocet TODOS je ${count}`);     
        
        

    client.close();
        });
    
});
