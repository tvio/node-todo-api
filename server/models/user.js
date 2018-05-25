var mongoose = require('mongoose');
var validator = require ('validator');
//user model -- ma na konci s, pokud ne s mongose doplni



var User = mongoose.model('users', {
             email: {
                type: String,
                minlength: 1,
                trim: true,
                required: true,
                unique: true,
                //nefunguje email validace
                validate:{
                    validator: (value) =>{ 
                  return validator.isEmail(value);
                  },
                  message: '{value} is not valid email'
                }
            },
            password: {
                type: String,
                require: true,
                minlength:6
            },
            tokens: [{
                access:{
                  type: String,
                  required: true  
                },
                token:{
                    type: String,
                    required: true

                }
            }]

});

module.exports = {User};