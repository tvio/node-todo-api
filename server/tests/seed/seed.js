const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'tomik@tomiku.cz',
    password: 'heslicko',
    tokens: [{
        access : 'auth',
        token : jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'jarda@example.com',
    password: 'heslicko2',
    tokens: [{
        access : 'auth',
        token : jwt.sign({_id:userTwoId,access:'auth'},'abc123').toString()
    }]
}
];
console.log(users);

const todos = [{
    _id: new ObjectId(),
    text: 'First test todo',
    _vytvoril: userOneId
    
},{
    _id: new ObjectId(),
    text: 'Second test todo',
    hotovo: true,
    _vytvoril: userTwoId
    
}];

console.log(todos);

const populateTodos = (done)=>{
    Todo.remove({}).then(()=> {
        Todo.insertMany(todos);
    }).then(()=>done());
};

const populateUsers = (done) =>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo])

        }).then(()=>done());
    };



module.exports = {users,todos,populateTodos, populateUsers};