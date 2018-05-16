var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// odkazuje se pouze na jednu db user nebo todos
mongoose.connect('mongodb://localhost:27017/todos');

module.exports = {mongoose};