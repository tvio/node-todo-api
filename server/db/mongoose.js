var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// odkazuje se pouze na jednu db user nebo todos
mongoose.connect('mongodb://tvio:123HEslo@ds131800.mlab.com:31800/todos');

module.exports = {mongoose};