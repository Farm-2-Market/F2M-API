const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;
require("dotenv").config();

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
  token: {type: String },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')){
       return next();
  }
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

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  let hp = this.password;
  bcrypt.compare(candidatePassword, hp, function (err, isMatch) {
    console.log(hp);
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (cb) {
  let user = this;
  user.accessToken = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: '20m' });
  user.refreshToken = jwt.sign({username: user.username}, process.env.REFRESH);

  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", UserSchema);
