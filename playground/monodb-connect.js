const MongoClient  = require ('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Users',(err,client)=>{
    if (err){
        console.log('Nelze se dostat na mongo server',err);
    }
    console.log('Jsem v mongu');
    
    // const db = client.db('TodoApp');
    
    // db.collection('Todos').insertOne({
    // text: 'Neco musim udelat',
    // comspleted: false
    // },(err,result)=>{
    //     if (err){
    //         return console.log('Nelze vlozit zaznam',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })


    const db = client.db('Users');
    db.collection('Uzivatele').insertOne({
        jmeno:'Tomik',
        vek : 77,
        lokalita: 'Brno'
    },(err,result)=>{
         if(!err){
             console.log(JSON.stringify(result.ops,undefined,2));
         }   
    });



    client.close();
});
