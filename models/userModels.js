const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;
  require('dotenv').config();

var UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token : {
    type : String
}
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// UserSchema.methods.comparePassword = function (candidatePassword, hashedPass, cb) {
//   console.log("compare called");
//   bcrypt.compare(candidatePassword, hashedPass, (err, isMatch) => {
//     if (err) return cb(err, null);
//     cb(null, isMatch);
//   });
// };
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET)
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
};


// UserSchema.statics.findByCredentials = async (username, password) => {
//   // Search for a user by email and password.
//   console.log("inside find", email)
//   const user = await User.findOne({ username} )

//   if (!user) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password)
//   if (!isPasswordMatch) {
//       throw new Error({ error: 'Invalid login credentials' })
//   }
//   return user
// }

module.exports = mongoose.model("User", UserSchema);
