//todos model
var mongoose = require('mongoose');

var Todo = mongoose.model('todo',{
    text : {
        type: String,
        required: true,
        minlength: 3,
        //oriznuti predek a zadeko prazdna mista
        trim: true
    },
    hotovo:{
        type: Boolean,
        required: true,
        default: false
    },
    hotovoDatum:{
        type: Date
    },
    _vytvoril: {
        required:true,
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = {Todo};