var mongoose = require('mongoose');

//user model -- ma na konci s, pokud ne s mongose doplni
 var User = mongoose.model('users', {
            jmeno: {
                type: String,
                minlength: 1,
                trim: true

            },
            email: {
                type: String,
                minlength: 1,
                trim: true

            }

        }
        );

module.exports = {User};