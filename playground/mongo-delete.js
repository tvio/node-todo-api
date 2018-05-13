// const MongoClient  = require ('mongodb').MongoClient;
const {MongoClient,ObjectID}  = require ('mongodb'); // vybereme pouze mongo client, to same co nahore plus dalsi


MongoClient.connect('mongodb://localhost:27017/todos',{ useNewUrlParser: true },(err,client)=>{
    if (err){
        console.log('Nelze se dostat na mongo server',err);
    }
    console.log('Jsem v mongu');
    const db = client.db('todos');

//find many
 //db.collection('todos').find({hotovo:false}).toArray((err,results)=>{
//db.collection('todos').deleteMany({text:'Neco musim udelat4'}).then((result)=>{
//    console.log(result);
//});
//delete one
//db.collection('todos').deleteOne({text:'zase neco'}).then((result) =>{
//    console.log(result);
//});
//find one and delate - vrati smazane date
 db.collection('todos').findOneAndDelete({text:'hop'}).then((result)=>{
     console.log(result);
     console.log(result.value);
 });
  
        

 client.close();
       
});