//var config = require('./../../conf/env.json')[process.env.NODE_ENV || 'production'];

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// odkazuje se pouze na jednu db user nebo todos
;
mongoose.connect(process.env.MONGODB_URI);

//take se da lokal a prod\
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos');

module.exports = {mongoose};

