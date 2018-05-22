var config = require('./../../conf/env.json')[process.env.NODE_ENV || 'production'];
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// odkazuje se pouze na jednu db user nebo todos
;
mongoose.connect(config.MONGO_URI);

module.exports = {mongoose};