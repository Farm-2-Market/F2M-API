const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./database/database");
const User = require("./models/userModels");
const Schema = Mongoose.Schema;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
db();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const server = http.createServer(app);
app.post("/signup", async function (req, res) {
  try {
let testUser = new User({
  _id: Mongoose.Types.ObjectId(),
  email: req.body.email,
  username: req.body.username,
  password: req.body.password
});
// save user to database
User.findOne({ username: `${testUser.username}` }, function(err, user) {
  if (!user){
testUser.save(function(err) {
  if (err){ throw err;}

// fetch user and test password verification
User.findOne({ username: req.body.username }, function(err, user) {
  if (err) throw err;

  // test a matching password
  user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) {throw err;
      }
      console.log('Password123:', isMatch);
      return res.send('user created')
  });

});
    });
  }else{
  console.log("user exists")
  user.comparePassword(req.body.password, function(err, isMatch) {
    if (err) throw err;
    console.log('passwords match?:', isMatch); // -> Password123: true
});

// test a failing password
// user.comparePassword('Password', function(err, isMatch) {
//     if (err) throw err;
//     console.log('Password:', isMatch); // -> 123Password: false
// });
  }
})
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", function (req, res){
  console.log(req.body)
})

//   console.log("request")
//   db()
//   User.findOne({ username: `${req.body.username}` }, function (err, user) {
//     console.log("find")
//     if (err) {
//       throw err;
//     }
//     if (!user) {
//       return res.json({ Status: "Username Not Valid" });
//     }
//     console.log("user", user)
//     // if the username is valid
//     // test to see if a matching password has been provided
//     user.comparePassword(req.body.password, function (err, isMatch) {
//       if (err) {
//         throw err;
//       }
//       // if it is a valid password create a JWT
//       // if (isMatch) {
//       //   console.log("Making tokens and stuff!");
//       //   user.generateToken((err, user) => {
//       //     if (err) {
//       //       return res.status(400).send(err);
//       //     }
//       //     res
//       //       .cookie("ths_auth", user.token)
//       //       .status(200)
//       //       .json({ "Login Success": "True" });
//       //   });
//       // }
//     });
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
