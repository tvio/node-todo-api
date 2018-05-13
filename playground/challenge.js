// const MongoClient  = require ('mongodb').MongoClient;
const {MongoClient,ObjectID}  = require ('mongodb'); // vybereme pouze mongo client, to same co nahore plus dalsi


MongoClient.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true },(err,client)=>{
    if (err){
        console.log('Nelze se dostat na mongo server',err);
    }
    console.log('Jsem v mongu');
    const db = client.db('users');

//remove duplicate users

db.collection('u').deleteMany({jmeno:'Tom'});
db.collection('u').findOneAndDelete({_id: new ObjectID("5af8ac7c58061549fe5116bd")})
.then((result)=>{
    console.log(result.value);
});      

 client.close();
       
});