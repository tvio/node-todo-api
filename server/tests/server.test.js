const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');
const {Todo} = require ('./../models/todo');
const {ObjectID} = require ('mongodb');

const {todos,populateTodos, users, populateUsers} = require ('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todo',()=>{
   it('should create a new todo', (done)=>{
    var text  = 'nove todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
          expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
            if(err){
                return done(err);
            }
        Todo.find({text}).then((todos) =>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((e)=>done(e));
      });
   });

   it('should not create todo with invalid body data',(done)=>{
    request(app)
     .post('/todos')
     //empty todo
     .send({})
     .expect(400)
     .end((err,res)=>{
           if(err){
               return done(err);
           }
       Todo.find().then((todos) =>{
           expect(todos.length).toBe(2);
           done();
       }).catch((e)=>done(e));

   });
});

describe('GET /todos',() =>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

});


describe('GET /todos/id',() =>{
    it('should get todo',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done)=>{
      var hexId = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if not valid',(done)=>{
        request(app)
        .get('/todos/213')
        .expect(404)
        .end(done);
    });

});

describe('DELETE /todos/:id', ()=>{
    it('should remove a todo', (done)=>{
        var hexId = todos[1]._id.toHexString();

        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res)=>{
              expect(res.body.todo._id).toBe(hexId);
          })
          .end((err,res)=>{
              if (err){
                  return done(err);
              }

         // query databse using findbyid aby nenaslo smazane id - toNotExist

        Todo.findById(hexId).then((todo)=>{
            expect(todo).toNotExist();
            done();
        }).catch((e)=>done(e));
                
           
    });

    });
    it('should return 404 if todo not found',(done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    

    });

    it('should return 404 if obejct is not valid',(done)=>{
        request(app)
        .get('/todos/213')
        .expect(404)
        .end(done); 
    });
});

//
describe('PATCH /todos/:id',()=>{
    it('should update todo', (done)=>{
        var hexId = todos[0]._id.toHexString();
        var text = 'Zmena ukolu';
        var hotovoDatum = new Date();
       
        //first item
        //update text, set hotovo true
        //200
        // text is changed, hotovo true, hotovoDatum is cislo .toBeA
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            hotovo:true,
            text,
            hotovoDatum
        })
        .expect(200)
        .expect((res)=>{
            expect (res.body.todo.text).toBe(text)
            //neumim kontrolovat datum zatim
            expect(res.body.todo.hotovoDatum).toBeA('string');
            expect(res.body.todo.hotovo).toBe(true);
        })
        .end(done);
            
    });
    it('should clear hotovoDatum pokud neni hotovo todo', (done)=>{
       //second item
       //update text, set hotovo false
       //200
       // text se zmenil , hotovo false, hotovoDatum  je null . toNotExist
       var hexId = todos[1]._id.toHexString();
       var text = 'Zmena ukolu cislo 2';
      
        request(app)
       .patch(`/todos/${hexId}`)
       .send({
           hotovo:false,
           text
       })
       .expect(200)
       .expect((res)=>{
           expect (res.body.todo.text).toBe(text)
           expect(res.body.todo.hotovoDatum).toNotExist();
           expect(res.body.todo.hotovo).toBe(false);
       })
       .end(done);
    });
    
});


describe('GET /users/me',()=>{
    it ('should return user if authenticated',(done)=>{
      request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
        
      .expect(200)
      .expect((res)=>{
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it ('should return 401 if not auth',(done)=>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });

});
  


