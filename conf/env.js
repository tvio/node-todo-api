var env = process.env.NODE_ENV || 'development';
console.log('prostredi >' , env);
if (env === 'development'){
   process.env.PORT = 3000;
   process.env.MONGODB_URI = 'mongodb://localhost:27017/todos';
} else if (env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todosTest';
} else if (env === 'production'){
    
    process.env.MONGODB_URI = 'mongodb://tvio:123Heslo@ds131800.mlab.com:31800/todos';
}  