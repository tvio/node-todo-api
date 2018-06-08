var mongoose = require('mongoose');
var validator = require ('validator');
var jwt = require ('jsonwebtoken');
const _ = require ('lodash');
const bcrypt = require ('bcryptjs');
//user model -- ma na konci s, pokud ne s mongose doplni

var UserSchema = new mongoose.Schema({ 
    email: {
       type: String,
       minlength: 1,
       trim: true,
       required: true,
       unique: true,
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


UserSchema.methods.toJSON = function (){
    var user = this
    var userObject = user.toObject();

    return _.pick(userObject,['_id'],'email');
}

UserSchema.methods.generateAuthToken = function (){
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

   user.tokens = user.tokens.concat([{access,token}]);
   
   return user.save().then(()=>{
       return token;
      });
 
};

UserSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull: {
            tokens:{
                token
            }
        }
    });
};

UserSchema.statics.findByToken = function (token){
   var User = this;
   var decoded;

   try {
     decoded =  jwt.verify(token,'abc123');    
   } catch (e) {
    //  return new Promise ((resolve,reject)=>{
    //      reject();
    //  });
    return  Promise.reject();
   }
   return User.findOne({
     _id: decoded._id,
     'tokens.token': token,
     'tokens.access':'auth'
   });
};

UserSchema.statics.findByCredentials = function (email,password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    console.log(user);
      if (!user){
          return Promise.reject();
          
      }
      return new Promise((resolve,reject)=>{
         //bcrypt.compare
        // console.log(password,user.password);
       // console.log('rovna');
    //  bcrypt.compare(password,user.password,(err,res)=>{
        //test ='CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB';
        //nemam hashovane passwordy v db
        bcrypt.compare(password,user.password,(err,res)=>{
          if (res){
              resolve(user);
              console.log('rovne heslo');   
          } else {
              reject();
              console.log('nerovne heslo');
          }
      });

      });
  });
};

UserSchema.pre('save',function (next){
   var user = this;

   if (user.isModified('password')){
       console.log('chci to ulozit');
      //hash
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
           
           user.password = hash;
           console.log(user.password);
           next();
        }); 
    });
      //nastavit hash
     
   } else {
    console.log('neukladam');
       next();
   }
});

var User = mongoose.model('users', UserSchema);

module.exports = {User};